import * as Yup from 'yup';

export const getDynamicSignUpSchema = (ownerCount = 0,staffCount=0) => {
  const ownersSchema = {};
  const staffSchema={}
  for (let i = 1; i <= ownerCount; i++) {
    ownersSchema[`owner${i}`] = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required(`Owner ${i} name is required`),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required(`Owner ${i} phone number is required`),
      image: Yup.string()
        .nullable()
        .required(`Owner ${i} image is required`)
    });
  }

  for (let i = 1; i <= staffCount; i++) {
    staffSchema[`staff${i}`] = Yup.object().shape({
      name: Yup.string()
        .min(2, `Staff ${i} name must be at least 2 characters`)
        .required(`Staff ${i} name is required`),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required(`Staff ${i} phone number is required`),
      image: Yup.string()
        .nullable()
        .required(`Staff ${i} image is required`),
        post: Yup.string().required(`Staff ${i} post is required`),

    });
  }
  return Yup.object().shape({
    hotelName: Yup.string().min(2).max(100).required('Hotel name is required'),
    hotelOwner: Yup.string().required('Hotel owner is required'),
    ownerNames: Yup.object().shape(ownersSchema),
    staffNames: Yup.object().shape(staffSchema),
  });
};
