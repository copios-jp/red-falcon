const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

window.require = (lib) => {
  switch (lib) {
    case 'usb':
      return {}
    case 'ant-plus':
      return {}
    default:
      return {}
  }
}


