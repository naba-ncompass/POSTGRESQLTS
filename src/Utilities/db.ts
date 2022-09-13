const device = (sequelize:any, Sequelize:any) => {
    const device = sequelize.define("device",{
        // timestamps: false,
        time: {
        type: Sequelize.STRING
      },
      device: {
        type: Sequelize.STRING
      },
      consumption: {
        type: Sequelize.FLOAT 
      }

    });
    device.removeAttribute('id');

    return device;
  };
  
const customer = (sequelize:any, Sequelize:any) => {
    const customer = sequelize.define("customer",{
        // timestamps: false,
        PHONE_NO: {
        type: Sequelize.STRING
      },
      PASSWORD: {
        type: Sequelize.STRING
      },
      DEVICE: {
        type: Sequelize.STRING 
      }     
    });
    customer.removeAttribute('id');


    return customer;
  };

export default {device, customer}