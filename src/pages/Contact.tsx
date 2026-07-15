import { ActionButton } from "../components/portfolio/ActionButton";
import { profile } from "../data/portfolio";
import { publicCvUrl } from "../data/publicAssets";
import { bilingual, useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const { language } = useLanguage();

  return (
    <main className="page-shell contact-page contact-page-editorial page-enter">
      <section className="contact-layout contact-layout-editorial" aria-labelledby="contact-title">
        <div className="contact-copy contact-copy-editorial">
          <p className="section-eyebrow">{bilingual(language, "Contact", "联系我")}</p>
          <h1 id="contact-title">
            {bilingual(language, "Have a research idea? Let’s talk.", "有研究想法，欢迎来信交流。")}
          </h1>
          <p>
            {bilingual(
              language,
              "If you are working on efficient AI, generative AI, multimodal learning, or agentic systems, feel free to reach out by email.",
              "如果您正在开展 Efficient AI、Generative AI、多模态或智能体相关研究，欢迎通过邮件与我联系。",
            )}
          </p>
        </div>

        <aside aria-label={bilingual(language, "Contact details", "联系方式")} className="contact-panel-editorial">
          <p className="contact-channel-label">Email</p>
          <a className="contact-email-address" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-primary-action">
            <ActionButton href={`mailto:${profile.email}`} variant="primary">
              {bilingual(language, "Email Me", "发邮件联系")}
            </ActionButton>
          </div>
          <nav aria-label={bilingual(language, "Additional links", "其他链接")} className="contact-secondary-links">
            <a href={profile.github} rel="noreferrer" target="_blank">GitHub</a>
            <a download="Ken_Zhang_Public_CV.pdf" href={publicCvUrl}>{bilingual(language, "Download CV", "下载 CV")}</a>
          </nav>
          <p className="contact-status">
            {bilingual(language, "Open to research assistantships and research collaboration.", "欢迎研究助理机会与科研合作。")}
          </p>
        </aside>
      </section>
    </main>
  );
}
