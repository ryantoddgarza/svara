const include = {
  script: function(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  },

  sheet: function(url) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = url;
    document.head.appendChild(sheet);
  },
};

export default include;
