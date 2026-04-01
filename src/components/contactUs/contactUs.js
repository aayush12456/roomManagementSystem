import { View,ScrollView,KeyboardAvoidingView, Platform,Text,ActivityIndicator} from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Formik } from 'formik';
import { contactUs } from "../../schemas";
import { contactUsAsync, contactUsData } from "../../Redux/Slice/contactUsSlice/contactUsSlice";
const ContactUs=({profile,hotelName,hotelId})=>{
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(null);
  const contactSelector=useSelector((state)=>state.contactUs.contactUsObj)
  console.log('contadr',contactSelector)
  useEffect(() => {
    if (contactSelector?.mssg === "Email sent successfully") {

      setLoading(false)
      // ✅ Toast show
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Email sent successfully`,
        autoClose: 3000,
        containerStyle: {
          borderRadius: 16,
          marginHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: "#1F2937",
        },
        titleStyle: {
          fontSize: 15,
          fontWeight: "600",
          color: "#FFFFFF",
        },
      });
      if (formReset) {
        formReset();
      }
      // ✅ 3 sec baad state reset
      setTimeout(() => {
        dispatch(contactUsData());
      }, 3000);
    }
  }, [contactSelector.mssg]);
return (
    <>
    <Formik 
     initialValues={{
    name:'',
    phoneNumber:'',
    message:''
     }}
     validationSchema={contactUs}
     onSubmit={async(values, { resetForm }) => {
      setLoading(true);
      setFormReset(() => resetForm);
      const contactUsData={
        name:values.name,
        phoneNumber:values.phoneNumber,
        message:values.message,
        email:profile.email,
        hotelName:hotelName,
        id:hotelId

     }
     dispatch(contactUsAsync(contactUsData))
    }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched })=>(
            <>
             <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0} // adjust according to header height
    >
            <ScrollView contentContainerStyle={{ flexGrow: 1,  }}
keyboardShouldPersistTaps="handled">
            <View style={{marginTop:40}}>
  <View style={{ paddingHorizontal:16 }}>
        <TextInput
          label="Your Name"
          mode="outlined"

          value={values.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        {touched.name && errors.name && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.name}
                  </Text>
                )}
      </View>
      <View style={{ paddingHorizontal:16,marginTop:12 }}>
        <TextInput
          label="Your Mobile Number"
          mode="outlined"
          keyboardType="numeric"
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
        />
        {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.phoneNumber}
                  </Text>
                )}
      </View>

      <View style={{ paddingHorizontal:16,marginTop:12 }}>
      <TextInput
  label="Message"
  mode="outlined"
  multiline
  numberOfLines={5}
  style={{
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top'
  }}
  value={values.message}   // ✅ FIXED
  onChangeText={handleChange("message")}
  onBlur={handleBlur("message")}
/>
{touched.message && errors.message && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.message}
                  </Text>
                )}
      </View>
      <View style={{ width: '100%', overflow: 'hidden' }}>
<Button
  mode="contained"
  disabled={loading}
  style={{
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
    marginRight: 20,
    backgroundColor: "#007BFF", // force color
    // opacity:loading ? 0.8 : 1, // disabled feel
  }}
  contentStyle={{ height: 50 }}
  onPress={handleSubmit}
>
  {loading ? (
    <View style={{ flexDirection: "row", alignItems: "center",gap:4 }}>
<ActivityIndicator size="small" color="#ffffff" style={{marginLeft:-12}} />
      <Text style={{ color: "#ffffff",textAlign:'center',fontWeight:'600' }}>sending...</Text>
    </View>
  ) : (
    "Send Message"
  )}
</Button>

      </View>
         </View>
            </ScrollView>
         
            </KeyboardAvoidingView>

            </>
        )}
      </Formik>
    </>
)
}
export default ContactUs