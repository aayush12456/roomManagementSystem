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
  relation:Yup.string().min(1).required("Please enter relation"),
  customerIdProof:Yup.string().min(6).required("Please enter customer id proof"),
  customerAadharNumber:Yup.string().min(12).required("Please enter customer Aadhar Number"),
  customerCity:Yup.string().min(2).required("Please enter customer city"),
  customerOccupation:Yup.string().min(2).required("Please enter customer Occupation"),
  customerDestination:Yup.string().min(2).required("Please enter customer Destination"),
  reasonToStay:Yup.string().min(2).required("Please enter reason to stay"),
  checkInDate:Yup.string().min(2).required("Please enter checkInDate"),
  checkInTime:Yup.string().min(2).required("Please enter checkInTime"),
  checkOutDate:Yup.string().min(2).required("Please enter checkOutDate"),
 personalCheckOutTime:Yup.string().min(2).required("Please enter PersonalCheckOutTime"),
  totalPayment:Yup.string().min(2).required("Please enter total payment"),
  paymentPaid:Yup.string().min(2).required("Please enter payment paid"),
  paymentDue:Yup.string().min(2).required("Please enter payment due"),
  executiveName:Yup.string().min(2).max(50).required("Please enter front desk executive name"),
  customerSignature: Yup.string().required("Customer Signature required") ,
  extraCustomers: Yup.array().when("totalCustomer", (totalCustomer, schema) => {
    const count = parseInt(totalCustomer || "0");

    if (count > 1) {
      return schema.of(
        Yup.object({
          customerName: Yup.string().min(2).required("Extra customer name required"),
          customerAddress: Yup.string().min(2).required("Extra customer address required"),
          customerPhoneNumber: Yup.string().min(10).required("Extra customer phone required"),
          customerAadharNumber: Yup.string().min(12).required("Extra customer Aadhar required"),
        })
      ).min(count - 1, `Please enter ${count - 1} extra customers`);
    }

    return schema.notRequired();
  }),

})

export const advanceCustomerBookingSchema=Yup.object({
  customerName:Yup.string().min(2).max(50).required("Please enter customer name"),
  customerAddress:Yup.string().min(2).required("Please enter customer address"),
  customerPhoneNumber:Yup.string().min(2).required("Please enter customer phone number"),
  executiveName:Yup.string().min(2).max(50).required("Please enter front desk executive name"),
  totalPayment:Yup.string().min(2).required("Please enter total payment"),
  advancePayment:Yup.string().min(2).required("Please enter advance payment"),
})


export const roomAdd=Yup.object({
  roomType:Yup.string().min(2).required("Please select room type"),
  bedType:Yup.string().min(2).required("Please select bed type"),
  roomNumber:Yup.string().min(2).required("Please enter room number"),
})