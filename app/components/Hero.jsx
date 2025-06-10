const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl  px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Discover Amazing Stories
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            A modern blog platform powered by AI to help you write, discover,
            and share incredible content
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <button className="inline-block rounded border border-emerald-600 bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700">
              Star Writing
            </button>

            <button className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900">
              Expolre Posts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
