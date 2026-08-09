import { motion } from "framer-motion";
import {
  FiCompass,
  FiEye,
  FiHeart,
  FiLock,
  FiShield,
  FiTarget,
} from "react-icons/fi";
import { SEO } from "@/components/common/SEO";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SITE } from "@/config/site";

const VALUES = [
  {
    icon: FiShield,
    title: "Honestidad en el diagnóstico",
    description:
      "Te decimos con claridad qué le pasa a tu equipo y qué opciones tienes, antes de cobrarte cualquier cosa.",
  },
  {
    icon: FiLock,
    title: "Confidencialidad",
    description:
      "Tu equipo puede contener archivos e información sensible. La tratamos con el mismo cuidado que le daríamos a la nuestra.",
  },
  {
    icon: FiHeart,
    title: "Compromiso con el cliente",
    description:
      "Nos tomamos el tiempo de explicarte lo que hicimos y por qué, en un lenguaje que puedas entender.",
  },
  {
    icon: FiTarget,
    title: "Precios claros",
    description:
      "Te confirmamos el valor antes de realizar cualquier trabajo, sin sorpresas en la entrega.",
  },
];

export function About() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Conoce a TI.MO SOLUTIONS: mantenimiento, actualización y venta de tecnología con diagnósticos honestos y garantía en cada servicio."
        path="/nosotros"
      />

      <section className="bg-hero-gradient pb-16 pt-32 text-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Nosotros" }]} />
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-2xl font-display text-4xl font-bold sm:text-5xl"
          >
            Un equipo técnico que cuida tus equipos como propios
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-lg text-white/75"
          >
            {SITE.description}
          </motion.p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h2 className="font-display text-2xl font-bold">Nuestra historia</h2>
            <p className="text-foreground-muted">
              TI.MO SOLUTIONS nace de una idea simple: la tecnología debería
              ser fácil de mantener, sin tecnicismos innecesarios ni precios
              poco claros. Empezamos atendiendo casos de mantenimiento y
              actualización en Chía, y hoy trabajamos también en toda la
              Sabana de Bogotá, incluyendo atención de urgencias fuera de
              nuestro horario habitual.
            </p>
            <p className="text-foreground-muted">
              Cada equipo que recibimos pasa por un diagnóstico honesto antes
              de cualquier intervención, para que sepas exactamente qué
              necesita y cuánto va a costar.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex gap-4 rounded-2xl border border-border bg-background-alt p-6"
            >
              <FiCompass className="mt-1 shrink-0 text-primary" size={28} />
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Misión
                </h3>
                <p className="text-foreground-muted">
                  Brindar mantenimiento, actualización y venta de tecnología
                  con diagnósticos honestos, precios claros y garantía real,
                  para que las personas y pequeñas empresas de la Sabana de
                  Bogotá puedan seguir trabajando sin contratiempos.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex gap-4 rounded-2xl border border-border bg-background-alt p-6"
            >
              <FiEye className="mt-1 shrink-0 text-primary" size={28} />
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Visión
                </h3>
                <p className="text-foreground-muted">
                  Ser el aliado técnico de referencia en Chía y la Sabana de
                  Bogotá para el mantenimiento y la actualización de equipos,
                  reconocidos por la confianza y la calidad de nuestro
                  trabajo.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-y bg-background-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Nuestros valores" title="Lo que nos guía" />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-3xl bg-hero-gradient p-8 text-white sm:p-12"
          >
            <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl">
              Calidad y garantía en cada servicio
            </h2>
            <p className="max-w-2xl text-white/75">
              Todo servicio que realizamos queda respaldado por una garantía,
              y los componentes y licencias que vendemos cuentan con la
              garantía del fabricante. Si algo no queda como esperabas,
              escríbenos y lo resolvemos.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
