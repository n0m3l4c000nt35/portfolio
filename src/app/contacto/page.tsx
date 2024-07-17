"use client";

export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-2">
      <h1 className="page-title">Contacto</h1>
      <form action={() => alert("Coming soon..!!")} className="min-w-64">
        <div className="mb-2">
          <label htmlFor="name" className="block font-semibold">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-[1px] bg-transparent border-lime-500 p-2 focus:outline-none"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block font-semibold">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border-[1px] bg-transparent border-lime-500 p-2 focus:outline-none"
          />
        </div>
        <label htmlFor="message" className="block font-semibold">
          Mensaje
        </label>
        <textarea
          name="message"
          id="message"
          className="w-full resize-none	border-[1px] bg-transparent border-lime-500 p-2 focus:outline-none"
        ></textarea>
        <button
          type="submit"
          className="block w-full border-[1px] border-gray-300 bg-gray-800 py-2 text-gray-300 text-xl"
        >
          ENVIAR
        </button>
      </form>
    </section>
  );
}
