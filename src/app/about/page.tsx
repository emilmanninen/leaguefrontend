import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">About project</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-muted-foreground">
          <p>
            I gathered data from Riot&apos;s official API and built visualizations
            showing popular trends across League of Legends champions.
          </p>
          <p>
            The data here is fairly limited, mainly because personal API keys come with
            strict rate limits. Getting around that would need an enterprise key, which
            Riot doesn&apos;t hand out for personal projects. Because of that, other
            sites already do this kind of analysis better than I have here. This was
            mostly a chance to practice building something real, not to compete with
            them.
          </p>
          <p>
            The technical details are documented on GitHub if you&apos;re curious.
            Thanks for stopping by!{" "}
            <a
              href="https://github.com/emilmanninen/leaguefrontend"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              https://github.com/emilmanninen/leaguefrontend
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
