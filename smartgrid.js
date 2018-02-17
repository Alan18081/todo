const smartgrid = require('smart-grid');

smartgrid('./src/styles/',{
  outputStyle: 'sass',
  columns: 12,
  container: {
    maxWidth: '1100px'
  },
  breakPoints: {
    lg: {
      width: '1200px'
    },
    md: {
      width: '992px'
    },
    sm: {
      width: '768px'
    },
    xs: {
      width: '480px'
    }
  }
});
