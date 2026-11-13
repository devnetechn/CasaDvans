import Seo from '../components/Seo'
import Landscape from '../components/Landscape'
import Action from '../components/Action'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." noindex />
      <section className="relative isolate flex min-h-[85svh] flex-col justify-end overflow-hidden bg-ridge-deep text-paper">
        <Landscape className="absolute inset-0 -z-10 h-full w-full opacity-60" />
        <div className="shell pb-16 pt-36 md:pb-24">
          <p className="ui text-[0.95rem] font-medium text-paper/80">Error 404</p>
          <h1 className="mt-4 max-w-[13ch] text-display font-extrabold">This trail doesn&rsquo;t lead anywhere.</h1>
          <p className="mt-6 max-w-md text-lg text-paper/85">The page you were looking for has moved or never existed. Head back up to the main path.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Action to="/">Back to home</Action>
            <Action to="/contact" variant="outline-light">Contact us</Action>
          </div>
        </div>
      </section>
    </>
  )
}
