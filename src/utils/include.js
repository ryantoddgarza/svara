const include = {
  script(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  },

  sheet(url) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = url;
    document.head.appendChild(sheet);
  },
};

export default include;
