import mcmArtsInstitutionStrategy from "../assets/project-details/mcm-arts-institution-strategy.png";
import mcmResearchUniversityStrategy from "../assets/project-details/mcm-research-university-strategy.png";
import mcmVocationalInstitutionStrategy from "../assets/project-details/mcm-vocational-institution-strategy.png";
import njtechLogo from "../assets/institutions/njtech-logo.png";
import polyuLogo from "../assets/institutions/polyu-logo.png";

type ConnectionAwareNavigator = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

const importedImageModules = import.meta.glob(
  "../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

const priorityImageSources = [
  polyuLogo,
  njtechLogo,
  mcmResearchUniversityStrategy,
  mcmVocationalInstitutionStrategy,
  mcmArtsInstitutionStrategy,
];

const priorityImageSet = new Set(priorityImageSources);
const remainingImageSources = [...new Set(Object.values(importedImageModules))]
  .filter((src) => !priorityImageSet.has(src));

const imagePromises = new Map<string, Promise<void>>();
let siteImagePromise: Promise<void> | undefined;

function loadImage(src: string, fetchPriority: "high" | "low") {
  const existingPromise = imagePromises.get(src);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;

    image.decoding = "async";
    image.fetchPriority = fetchPriority;

    const settle = () => {
      if (settled) return;
      settled = true;
      image.decode().catch(() => undefined).finally(resolve);
    };

    image.addEventListener("load", settle, { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
    image.src = src;

    if (image.complete) settle();
  });

  imagePromises.set(src, promise);
  return promise;
}

async function preloadInBatches(sources: string[], batchSize: number) {
  for (let index = 0; index < sources.length; index += batchSize) {
    const batch = sources.slice(index, index + batchSize);
    await Promise.all(batch.map((src) => loadImage(src, "low")));
  }
}

export function preloadSiteImages() {
  if (!siteImagePromise) {
    siteImagePromise = Promise.all([
      Promise.all(priorityImageSources.map((src) => loadImage(src, "high"))),
      preloadInBatches(remainingImageSources, 6),
    ]).then(() => undefined);
  }

  return siteImagePromise;
}

export function scheduleSiteImagePreload() {
  const navigatorWithConnection = navigator as ConnectionAwareNavigator;
  if (navigatorWithConnection.connection?.saveData) return () => undefined;

  const handle = window.setTimeout(() => {
    void preloadSiteImages();
  }, 180);

  return () => window.clearTimeout(handle);
}
