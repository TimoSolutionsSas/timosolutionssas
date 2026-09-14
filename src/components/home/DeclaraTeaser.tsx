import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiShield } from "react-icons/fi";
import { fadeUp } from "@/animations/variants";

/**
 * DeclaraSinMiedo en la página de inicio. Usa la paleta marino y la serifa
 * del propio producto, no la del sitio: es una marca distinta dentro de
 * TI.MO SOLUTIONS y conviene que se lea así desde aquí.
 */
export function DeclaraTeaser() {
  return (
    <section className="container-page py-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden rounded-3xl bg-[#071d42]"
      >
        <div className="grid gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-14">
          <div>
            <p className="mb-4 font-sans text-[13px] font-medium text-[#7fb0f5]">
              Software propio de TI.MO SOLUTIONS
            </p>
            <h3 className="max-w-[18ch] font-serif text-[30px] font-semibold leading-[1.12] text-white sm:text-[38px]">
              DeclaraSinMiedo
            </h3>
            <p className="mt-4 max-w-[52ch] font-sans text-[15px] leading-relaxed text-[#b8cbe6]">
              Lee tus certificados, los cruza contra tu información exógena de la DIAN, detecta lo
              que falta o está repetido y calcula tu declaración de renta completa — explicando de
              dónde sale cada cifra. Funciona en tu computador, sin nube.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 font-sans text-[13px] text-[#d7e3f2]">
                <FiLock size={14} className="text-[#7fe0bb]" />
                100% local y cifrado
              </span>
              <span className="flex items-center gap-2 font-sans text-[13px] text-[#d7e3f2]">
                <FiShield size={14} className="text-[#7fe0bb]" />
                Pruébalo gratis con tus documentos
              </span>
            </div>

            <Link
              to="/declarasinmiedo"
              className="focus-ring mt-8 inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3 font-sans text-[14px] font-semibold text-[#071d42] transition-colors hover:bg-[#dce8f8]"
            >
              Conocer DeclaraSinMiedo
              <FiArrowRight size={15} />
            </Link>
          </div>

          {/* El reparto 90/10, que es la tesis del producto en una imagen */}
          <div className="lg:pl-6">
            <p className="font-sans text-[12.5px] text-[#8fa8c6]">
              El trabajo de declarar renta, repartido
            </p>
            <div className="mt-3 flex h-11 overflow-hidden rounded">
              <div className="flex w-[90%] items-center justify-center bg-[#1668d6]">
                <span className="font-sans text-[12px] font-semibold text-white">90% mecánico</span>
              </div>
              <div className="w-[10%] bg-[#0e7a56]" />
            </div>
            <p className="mt-3 max-w-[34ch] font-serif text-[17px] italic leading-relaxed text-white">
              La app hace el 90%. El criterio profesional sigue siendo humano.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
