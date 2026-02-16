import Reveal from "../components/Reveal";

const Academics = () => {
    return (
        <Reveal>
            <section id="academics" className="py-28 px-6">

                <h2 className="text-4xl font-bold text-center mb-16">
                    Academics
                </h2>

                <div className="max-w-4xl mx-auto space-y-8">

                    {/* College */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur hover:bg-white/10 transition">
                        <h3 className="text-xl font-semibold mb-2">
                            Bachelor of Computer Applications (BCA)
                        </h3>
                        <p className="text-gray-400">
                            Dr. Ram Manohar Lohia Avadh University • 2022 – 2025
                        </p>
                    </div>

                    {/* 12th */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur hover:bg-white/10 transition">
                        <h3 className="text-xl font-semibold mb-2">
                            Higher Secondary Education (12th)
                        </h3>
                        <p className="text-gray-400">
                            Uttar Pradesh Board • 2021 – 2022
                        </p>
                    </div>

                    {/* 10th */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur hover:bg-white/10 transition">
                        <h3 className="text-xl font-semibold mb-2">
                            Secondary Education (10th)
                        </h3>
                        <p className="text-gray-400">
                            Uttar Pradesh Board • 2019 – 2020
                        </p>
                    </div>

                </div>

            </section>
        </Reveal>
    );
};

export default Academics;
