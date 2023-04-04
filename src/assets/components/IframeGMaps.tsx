const IframeGMaps = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.0080216875026!2d9.919981816016412!3d53.55762426656549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b185916d9f6a57%3A0xac4456ac50bc1a9!2sHelmholtzstra%C3%9Fe%209%2C%2022765%20Hamburg!5e0!3m2!1ses!2sde!4v1680588059014!5m2!1ses!2sde"
      width="560"
      height="315"
      style={{ border: "0" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default IframeGMaps;
