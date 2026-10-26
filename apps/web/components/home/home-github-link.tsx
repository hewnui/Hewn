import { GITHUB_REPO_URL } from "@/lib/site-links";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";

type HomeGithubLinkProps = {
  className?: string;
};

/** Accessible GitHub repo link for marketing header/footer chrome. */
export function HomeGithubLink({ className }: HomeGithubLinkProps) {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hewn UI on GitHub"
      className={
        className ??
        "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-[color,transform,background-color] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
      }
    >
      <GithubLogoIcon aria-hidden className="size-5" weight="regular" />
    </a>
  );
}
