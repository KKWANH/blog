import type { Metadata } from "next";
import Image from "next/image";

export const title = "Editor's Introduction";
export const publishedAt = "2026-03-23";
export const summary =
  "An introduction to Kwanho Kim, the editor behind The Kkim Journal, and to the personal working view behind the site.";
export const showToc = false;
export const tocVariant = "inline";
export const toc = [
  { id: "editorial-introduction", label: "Introduction" },
  { id: "editorial-position", label: "Editorial Position" },
  { id: "editorial-biography", label: "Biographical Note" },
  { id: "working-method", label: "Working Method" },
];

export const metadata: Metadata = {
  title,
  description: "Introduction to the editor of The Kkim Journal",
};

export default function EditorIntroductionPage() {
  return (
    <>
      <section className="editor-hero" id="editorial-introduction">
        <div className="editor-hero__rule" />
        <div className="editor-hero__copy">
          <p className="editor-kicker">Editor&apos;s Introduction</p>
          <h1 className="editor-title">Editor&apos;s Introduction</h1>
        </div>
        <div className="editor-profile-lead">
          <div className="editor-portrait-column">
            <Image
              src="/profile3.jpg"
              alt="Portrait of Kwanho Kim"
              width={1556}
              height={2594}
              className="editor-portrait"
              priority
              unoptimized
            />
            <p className="editor-caption">Wolfsburg / Seoul</p>
          </div>
          <div className="editor-profile-copy">
            <p className="editor-subtitle">Kwanho Kim is a software engineer who uses this journal as a working notebook in public.</p>
            <p className="editor-deck">
              The site started around technical notes, but it also carries taste, doubt, and the more personal views that sit behind the work. Some entries are close to implementation. Some are closer to essay. Both belong here.
            </p>
            <p className="editor-lede">
              I care most about systems that meet real conditions: timing, physical behavior, failure, maintenance, and the people who have to live with them after launch.
            </p>
          </div>
        </div>
        <div className="editor-hero__rule" />
      </section>

      <section className="editor-section" id="editorial-position">
        <div className="editor-section__heading">
          <p className="section-eyebrow">Editorial Position</p>
          <h2 className="editor-section__title">
            This is where engineering work stays technical without becoming unreadable, and personal without becoming vague.
          </h2>
        </div>
        <div className="editor-columns">
          <div className="editor-prose">
            <p>
              I do not treat the site as a polished magazine or as a private diary. It sits in the middle: a place to keep implementation notes, decisions, and working opinions in a form that can still be read by someone else.
            </p>
            <p>
              That means some writing will stay close to systems, robotics, and interfaces. Other writing may carry more memory, context, or mood. The common rule is simple: if a thought helps explain the work, it belongs in the journal.
            </p>
          </div>
          <dl className="editor-facts">
            <div className="editor-fact">
              <dt>Coverage</dt>
              <dd>Systems, robotics, interfaces, engineering notes, and the personal view behind them.</dd>
            </div>
            <div className="editor-fact">
              <dt>Editor</dt>
              <dd>Kwanho Kim, based between Wolfsburg and Seoul.</dd>
            </div>
            <div className="editor-fact">
              <dt>Preference</dt>
              <dd>Clear systems, durable interfaces, and writing that does not hide behind jargon.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="editor-section" id="editorial-biography">
        <div className="editor-section__heading">
          <p className="section-eyebrow">Biographical Note</p>
          <h2 className="editor-section__title">The point of view is personal. The form stays edited.</h2>
        </div>
        <div className="editor-biography">
          <div className="editor-prose editor-prose--narrow">
            <p>
              I write from the intersection of software engineering, robotics, and interface design. The projects change, but the bias stays similar: I prefer systems that remain understandable under pressure and interfaces that do not collapse once they leave the mockup.
            </p>
            <p>
              That technical bias is only part of the site. The other part is editorial. I like trimming a note until the useful part shows. I like structure. I like sequence. I like being able to return to an old decision and still see what I meant.
            </p>
          </div>
          <div className="editor-aside-stack">
            <div className="editor-aside-note">
              <p className="editor-aside-note__label">Focus</p>
              <p className="editor-aside-note__text">Real-time systems, robotics, human-centered interfaces.</p>
            </div>
            <div className="editor-aside-note">
              <p className="editor-aside-note__label">Contact</p>
              <p className="editor-aside-note__text">kwanho0096@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="editor-section" id="working-method">
        <div className="editor-section__heading">
          <p className="section-eyebrow">Working Method</p>
          <h2 className="editor-section__title">Three things I want this place to do well.</h2>
        </div>
        <div className="editor-note-grid">
          <article className="editor-note">
            <p className="editor-note__eyebrow">01</p>
            <h3 className="editor-note__title">Keep technical work readable.</h3>
            <p className="editor-note__copy">
              Notes should stay precise without turning into internal documentation that only makes sense to the author.
            </p>
          </article>
          <article className="editor-note">
            <p className="editor-note__eyebrow">02</p>
            <h3 className="editor-note__title">Leave room for personal judgment.</h3>
            <p className="editor-note__copy">
              Choices about tools, systems, and interfaces are never fully neutral. The site should admit that openly.
            </p>
          </article>
          <article className="editor-note">
            <p className="editor-note__eyebrow">03</p>
            <h3 className="editor-note__title">Stay useful over time.</h3>
            <p className="editor-note__copy">
              The best entries should still read well months later, after the immediate context of a project has gone.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
