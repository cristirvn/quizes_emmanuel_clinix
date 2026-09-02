import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScoredQuiz, scoredQuizList } from "@/content/scored-quizzes";
import { buildMetadata } from "@/lib/seo";
import { ScoredQuiz } from "@/components/ScoredQuiz";

/**
 * A scored self-test (`/chestionare/[slug]`) — the funnel's main entry point
 * (client's v2 pivot: everything lives under the Chestionare tab). Linear quiz →
 * lead capture → result screen (grade + personalized advice + BrainMap CTA).
 *
 * Unlike `/rezultat/*`, these ARE indexable: they're the top of the funnel and
 * the pages we want people to land on from search and ads. The older campaign
 * URLs `/test/[slug]` permanently redirect here (see `next.config.ts`).
 *
 * The page still renders inside the minimal funnel chrome (no site nav) — see
 * `components/SiteChrome.tsx` — so nothing competes with finishing the test.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return scoredQuizList.map((q) => ({ slug: q.route }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getScoredQuiz(slug);
  if (!quiz) return {};
  return buildMetadata({
    title: quiz.seo.title,
    description: quiz.seo.description,
    path: `/chestionare/${slug}`,
  });
}

export default async function ScoredQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getScoredQuiz(slug);
  if (!quiz) notFound();
  return <ScoredQuiz quiz={quiz} />;
}
