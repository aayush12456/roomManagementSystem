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
export const customerDetailsSchema=Yup.object({
  customerName:Yup.string().min(2).max(50).required("Please enter customer name"),
  customerAddress:Yup.string().min(2).required("Please enter customer address"),
  customerPhoneNumber:Yup.string().min(2).required("Please enter customer phone number"),
  totalCustomer:Yup.string().min(1).required("Please enter total customer"),
  customerAadharNumber:Yup.string().min(12).required("Please enter customer aadhar number"),
  customerCity:Yup.string().min(2).required("Please enter customer city"),
  checkInDate:Yup.string().min(2).required("Please enter checkInDate"),
  checkInTime:Yup.string().min(2).required("Please enter checkInTime"),
  checkOutDate:Yup.string().min(2).required("Please enter checkOutDate"),
  checkOutTime:Yup.string().min(2).required("Please enter checkOutTime"),
  totalPayment:Yup.string().min(2).required("Please enter total payment"),
  paymentPaid:Yup.string().min(2).required("Please enter payment paid"),
  paymentDue:Yup.string().min(2).required("Please enter payment due"),
  executiveName:Yup.string().min(2).max(50).required("Please enter front desk executive name")
})