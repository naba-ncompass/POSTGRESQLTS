const uc3 = (sequelize:any, Sequelize:any) => {
    const uc3 = sequelize.define("uc3",{
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
    uc3.removeAttribute('id');

    return uc3;
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

export default {uc3, customer}