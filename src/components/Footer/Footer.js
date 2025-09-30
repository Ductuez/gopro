export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-xs border-t border-gray-800 py-4 px-6 flex flex-col lg:flex-row items-center justify-between">
      {/* Left: Disclaimer */}
      <p className="mb-2 lg:mb-0 max-w-3xl text-center lg:text-left leading-snug">
        DPM.LOL is not endorsed by Riot Games and does not reflect the views or
        opinions of Riot Games or anyone officially involved in producing or
        managing Riot Games properties. Riot Games and all associated properties
        are trademarks or registered trademarks of Riot Games, Inc. Some content
        provided courtesy of{" "}
        <a
          href="https://lol.fandom.com"
          target="_blank"
          className="underline hover:text-white"
          rel="noopener"
        >
          Leaguepedia
        </a>
        , under a{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          className="underline hover:text-white"
          rel="noopener"
        >
          CC-BY-SA 3.0 license
        </a>
        .
      </p>

      {/* Right: Links */}
      <div className="flex flex-wrap gap-4 text-gray-400 mt-2 lg:mt-0">
        <a href="/roadmap" className="hover:text-white">
          Roadmap
        </a>
        <a href="/advertise" className="hover:text-white">
          Advertise with us
        </a>
        <a href="/contact" className="hover:text-white">
          Contact
        </a>
        <a href="/privacy" className="hover:text-white">
          Privacy
        </a>
        <a href="/terms" className="hover:text-white">
          ToS
        </a>
        <a href="/legal" className="hover:text-white">
          Legal
        </a>
      </div>
    </footer>
  );
}
