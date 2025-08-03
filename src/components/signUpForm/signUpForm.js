import * as React from 'react';
import { useState,useEffect } from 'react';
import { TextInput,Button } from 'react-native-paper';
import { View,Image, ScrollView,Text,KeyboardAvoidingView, Platform, Keyboard, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpImage from '../../../assets/AllIcons/signupImage.jpeg'
import hotel from '../../../assets/AllIcons/hotel.png'
import {Picker} from '@react-native-picker/picker';
import { HotelImages, bedType, pickerList, roomType, staffPostList } from '../../utils/signUpData';
import avatar from '../../../assets/AllIcons/avatar.png'
import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
import { ToWords } from 'to-words';
import {  useDispatch } from 'react-redux';
import { hotelRegisterAsync } from '../../Redux/Slice/hotelRegisterSlice/hotelRegisterSlice';


const SignUpForm=()=>{ // safe-area context use ho rha status bar se apne view ko distance pe rakhne ke liye
  const dispatch=useDispatch()
  const [selectedOwnerList, setSelectedOwnerList] = useState('Hotel Owner');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [ownerNames, setOwnerNames] = useState([]);
  const [staffNamesArray,setStaffNamesArray]=useState([])
  const [roomNamesArray,setRoomNamesArray]=useState([])
  const [totalFloorArray,setTotalFloorArray]=useState([])
  const [hotelImagesArray,setHotelImagesArray]=useState([])
  const [totalStaff,setTotalStaff]=useState('')
  const [totalRooms,setTotalRooms]=useState('')
  const [totalFloors,setTotalFloors]=useState('')
  const [hotelName,setHotelName]=useState('')
  const [selectedStaffList, setSelectedStaffList] = useState('Designation');
  const [hotelImagesList, setHotelImagesList] = useState('Hotel Images');
  const [formErrors,setFormErrors]=useState({})
  const [floorData, setFloorData] = useState({});
  const [floorObj, setFloorObj] = useState({});

  const floorNames = ['Ground Floor'];
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      convertNumberToOrdinal: true,
    },
  });
  // useEffect(()=>{
  //   for (let i = 1; i < totalFloors; i++) {
  //     const word = toWords.convert(i);
  //     floorNames.push(`${word} Floor`);
  //   }
  //   setFloorData(floorNames)
  // },[totalFloors])
  const getFloorName = (index) => {
    if (index === 0) return 'Ground Floor';
    return `${toWords.convert(index)} Floor`;
  };
  
  useEffect(() => {
    const floorNames = [];
    for (let i = 0; i < totalFloors; i++) {
      floorNames.push(getFloorName(i));
    }
    setFloorData(floorNames);
  }, [totalFloors]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const count = parseInt(selectedOwnerList);
    if (!isNaN(count) && count > 0) {
      const newOwners = {};
      for (let i = 1; i <= count; i++) {
        newOwners[`owner${i}`] = { name: '', phone: '',image:null };
      }
      setOwnerNames(newOwners);
    } else {
      setOwnerNames({});
    }
  }, [selectedOwnerList]);

  useEffect(() => {
    const staffCount = parseInt(totalStaff);
    if (!isNaN(staffCount) && staffCount > 0) {
      const staffObj = {};
      for (let i = 1; i <= staffCount; i++) {
        staffObj[`staff${i}`] = { name: '', phone: '',image:null,post:'' };
      }
      setStaffNamesArray(staffObj);
    } else {
      setStaffNamesArray({});
    }
  }, [totalStaff]);

  

  useEffect(() => {
    const hotelImageCount = parseInt(hotelImagesList);
    if (!isNaN(hotelImageCount) && hotelImageCount > 0) {
      const hotelObj = {};
      for (let i = 1; i <= hotelImageCount; i++) {
        hotelObj[`hotelImg${i}`] = {image:null };
      }
      setHotelImagesArray(hotelObj);
    } else {
      setHotelImagesArray({});
    }
  }, [hotelImagesList]);

  const handleOwnerNameChange = (type, text, index) => {
    const key = `owner${index + 1}`;
    setOwnerNames((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: text,
      },
    }));
  };

  const handleStaffDataChange = (type, text, index) => {
    const key = `staff${index + 1}`;
    setStaffNamesArray((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: text,
      },
    }));
  };

  // const handleRoomDataChange = (roomKey, type, value) => {
  //   setRoomNamesArray(prev => ({
  //     ...prev,
  //     [roomKey]: {
  //       ...prev[roomKey],
  //       [type]: value
  //     }
  //   }));
  // };
  const handleRoomDataChange = (roomKey, type, value) => {
    // setRoomNamesArray(prev => {
    //   const updated = {
    //     ...prev,
    //     [roomKey]: {
    //       ...prev[roomKey],
    //       [type]: value
    //     }
    //   };
    //   // console.log('📦 Updated roomData:', updated);
    //   return updated;
    // });
    const updated = { ...roomNamesArray }; // copy current state
    if (!updated[roomKey]) {
      updated[roomKey] = {}; // initialize if not present
    }
    updated[roomKey][type] = value; // update the specific field
  
    console.log('📦 Updated roomData:', updated);
    setRoomNamesArray(updated); // update state
  };
  console.log('staff name array',staffNamesArray)
  console.log('room name array',roomNamesArray)
  const uploadImage = async (ownerKey,setFieldValue) => {
    try {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
  
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 only images
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        // setFieldValue(`ownerNames.${ownerKey}.image`, selectedImage.uri);
        console.log(`Owner ${ownerKey} Image URI:`,selectedImage.uri); // 👈 Console log
        setOwnerNames((prev) => ({
          ...prev,
          [ownerKey]: {
            ...prev[ownerKey],
            image: selectedImage.uri,
          },
        }));
      } else {
        console.log('No image selected or operation canceled.');
      }
    } catch (error) {
      console.log('Error during image picking:', error);
    }
  };

  
  const uploadStaffImage = async (ownerKey,setFieldValue) => {
    try {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
  
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 only images
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
  
        // setFieldValue(`staffNames.${ownerKey}.image`, selectedImage.uri);
        // console.log(`staff ${ownerKey} Image URI:`,selectedImage.uri); // 👈 Console log
        setStaffNamesArray((prev) => ({
          ...prev,
          [ownerKey]: {
            ...prev[ownerKey],
            image: selectedImage.uri,
          },
        }));
      } else {
        console.log('No image selected or operation canceled.');
      }
    } catch (error) {
      console.log('Error during image picking:', error);
    }
  };
    const floorSelect=(val,floor)=>{
    setFloorObj((prev) => ({
      ...prev,
      [floor]: {
        floorNumber: val,
      },
    }));
    }
    console.log('floor obj',floorObj)

    // useEffect(() => {
    //   const floorCount = parseInt(floorObj.floorNumber);
    //   if (!isNaN(floorCount) && floorCount > 0) {
    //     const floorDataObj = {};
    //     const name = floorObj.floorName;
    //     for (let i = 1; i <= floorCount; i++) {
    //       floorDataObj[`${name} Room ${i}`] = {roomType:'',bedType:''};
    //     }
    //     setTotalFloorArray((prev) => ({
    //       ...prev,
    //       ...floorDataObj,
    //     }));
    //   } 
    //   else{
    //     // setTotalFloorArray((prev) => {
    //     //   const updated = { ...prev };
    //     //   Object.keys(updated).forEach((key) => {
    //     //     if (key.startsWith(`${floorName} Room`)) {
    //     //       delete updated[key];
    //     //     }
    //     //   });
    //     //   return updated;
    //     // });
    //   }
    // }, [floorObj.floorNumber,floorObj.floorName]);
    useEffect(() => {
      Object.entries(floorObj).forEach(([floorName, floorData]) => {
        const floorCount = parseInt(floorData.floorNumber);
    
        if (!isNaN(floorCount) && floorCount > 0) {
          const floorDataObj = {};
          for (let i = 1; i <= floorCount; i++) {
            floorDataObj[`${floorName} Room ${i}`] = { roomType: '', bedType: '' };
          }
    
          setTotalFloorArray((prev) => ({
            ...prev,
            ...floorDataObj,
          }));
        } else {
          // Remove old room entries of this floor
          setTotalFloorArray((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((key) => {
              if (key.startsWith(`${floorName} Room`)) {
                delete updated[key];
              }
            });
            return updated;
          });
        }
      });
    }, [floorObj]);
    
    console.log('total floor array',totalFloorArray)
  console.log('floor data is',floorData)
  const uploadHotelImage = async (hotelKey) => {
    try {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
  
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 only images
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
  
    
        setHotelImagesArray((prev) => ({
          ...prev,
          [hotelKey]: {
            ...prev[hotelKey],
            image: selectedImage.uri,
          },
        }));
      } else {
        console.log('No image selected or operation canceled.');
      }
    } catch (error) {
      console.log('Error during image picking:', error);
    }
  };

  // const registerFormSubmitHandler=()=>{
   
  //   const errors = {};

  //   // ----------- Hotel Name Validation -----------
  //   if (!hotelName || hotelName.trim().length < 2 || hotelName.trim().length > 64) {
  //     errors.hotelName = "Hotel name is required and must be between 2-64 characters.";
  //   }
  
  //   // ----------- Owners Validation -----------
  //   if (Object.keys(ownerNames).length === 0) {
  //     errors.owners = "At least one hotel owner is required.";
  //   } else {
  //     for (const key in ownerNames) {
  //       const owner = ownerNames[key];
  //       if (!owner.name || owner.name.trim().length < 2 || owner.name.trim().length > 64) {
  //         errors[`ownerName_${key}`] = `${key} name is required and must be 2–64 characters.`;
  //       }
  //       if (!owner.phone || !/^\d{10}$/.test(owner.phone)) {
  //         errors[`ownerPhone_${key}`] = `${key} phone is required and must be a 10-digit number.`;
  //       }
  //       if (!owner.image) {
  //         errors[`ownerImage_${key}`] = `${key} image is required.`;
  //       }
  //     }
  //   }
  
  //   // ----------- Staff Validation -----------
  //   if (Object.keys(staffNamesArray).length === 0) {
  //     errors.staff = "At least one staff member is required.";
  //   } else {
  //     for (const key in staffNamesArray) {
  //       const staff = staffNamesArray[key];
  //       if (!staff.name || staff.name.trim().length < 2 || staff.name.trim().length > 64) {
  //         errors[`staffName_${key}`] = `${key} name is required and must be 2–64 characters.`;
  //       }
  //       if (!staff.phone || !/^\d{10}$/.test(staff.phone)) {
  //         errors[`staffPhone_${key}`] = `${key} phone is required and must be a 10-digit number.`;
  //       }
  //       if (!staff.post) {
  //         errors[`staffPost_${key}`] = `${key} designation is required.`;
  //       }
  //       if (!staff.image) {
  //         errors[`staffImage_${key}`] = `${key} image is required.`;
  //       }
  //     }
  //   }
  
  //   // ----------- Hotel Images Validation -----------
  //   if (Object.keys(hotelImagesArray).length === 0) {
  //     errors.hotelImages = "At least one hotel image is required.";
  //   } else {
  //     for (const key in hotelImagesArray) {
  //       const img = hotelImagesArray[key];
  //       if (!img.image) {
  //         errors[`hotelImage_${key}`] = `Hotel image  is required.`;
  //       }
  //     }
  //   }
  
  //   // 🛑 If any errors, show them and stop submission
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //     return;
  //   }
  
  //   // ✅ If no errors, clear error state & submit
  //   setFormErrors({});
  //   const formData = new FormData()
  //   formData.append('hotelName', hotelName);
  //   formData.append('owners',ownerNames)
  //   formData.append('staff',staffNamesArray)
  //   formData.append('hotelImages',hotelImagesArray)
    
  //   // const formData = {
  //   //   hotelName: hotelName,
  //   //   owners: ownerNames,
  //   //   staff: staffNamesArray,
  //   //   hotelImages: hotelImagesArray,
  //   // };
  
  //   console.log("📦 Complete Form Data:", JSON.stringify(formData, null, 2));
  //   setHotelName('');
  //   setSelectedOwnerList('Hotel Owner'); // default value
  //   setOwnerNames({});
  //   setTotalStaff('');
  //   setStaffNamesArray({});
  //   setHotelImagesList('Hotel Images'); // default value
  //   setHotelImagesArray({});
  // }
  const registerFormSubmitHandler = async () => {
    const errors = {};
  
    // ✅ VALIDATIONS
    if (!hotelName || hotelName.trim().length < 2 || hotelName.trim().length > 64) {
      errors.hotelName = "Hotel name is required and must be between 2-64 characters.";
    }
  
    if (Object.keys(ownerNames).length === 0) {
      errors.owners = "At least one hotel owner is required.";
    } else {
      for (const key in ownerNames) {
        const owner = ownerNames[key];
        if (!owner.name || owner.name.trim().length < 2) {
          errors[`ownerName_${key}`] = `${key} name is invalid.`;
        }
        if (!owner.phone || !/^\d{10}$/.test(owner.phone)) {
          errors[`ownerPhone_${key}`] = `${key} phone must be 10 digits.`;
        }
        if (!owner.image) {
          errors[`ownerImage_${key}`] = `${key} image is required.`;
        }
      }
    }
  
    if (Object.keys(staffNamesArray).length === 0) {
      errors.staff = "At least one staff member is required.";
    } else {
      for (const key in staffNamesArray) {
        const staff = staffNamesArray[key];
        if (!staff.name || staff.name.trim().length < 2) {
          errors[`staffName_${key}`] = `${key} name is invalid.`;
        }
        if (!staff.phone || !/^\d{10}$/.test(staff.phone)) {
          errors[`staffPhone_${key}`] = `${key} phone must be 10 digits.`;
        }
        if (!staff.post) {
          errors[`staffPost_${key}`] = `${key} post is required.`;
        }
        if (!staff.image) {
          errors[`staffImage_${key}`] = `${key} image is required.`;
        }
      }
    }
  
    if (Object.keys(hotelImagesArray).length === 0) {
      errors.hotelImages = "At least one hotel image is required.";
    } else {
      for (const key in hotelImagesArray) {
        const img = hotelImagesArray[key];
        if (!img.image) {
          errors[`hotelImage_${key}`] = `Hotel image ${key} is required.`;
        }
      }
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    setFormErrors({});
    const formData = new FormData();
  
    // 🏨 Append Hotel Name
    formData.append('hotelName', hotelName);
  
    // 👤 Append Owners
    Object.keys(ownerNames).forEach((key, index) => {
      const owner = ownerNames[key];
      formData.append(`owner${index + 1}`, JSON.stringify({
        name: owner.name,
        phone: owner.phone,
      }));
      formData.append('ownerImages', {
        uri: owner.image,
        name: `owner_${index + 1}.jpg`,
        type: 'image/jpeg',
      });
    });
  
    // 👷‍♂️ Append Staff Members
    Object.keys(staffNamesArray).forEach((key, index) => {
      const staff = staffNamesArray[key];
      formData.append(`staff${index + 1}`, JSON.stringify({
        name: staff.name,
        phone: staff.phone,
        post: staff.post,
      }));
      formData.append('staffImages', {
        uri: staff.image,
        name: `staff_${index + 1}.jpg`,
        type: 'image/jpeg',
      });
    });
  
    // 🏨 Append Hotel Images
    Object.keys(hotelImagesArray).forEach((key, index) => {
      const img = hotelImagesArray[key];
      formData.append('hotelImages', {
        uri: img.image,
        name: `hotelImg_${index + 1}.jpg`,
        type: 'image/jpeg',
      });
    });

    //✅ roomNamesArray - room data
  Object.keys(roomNamesArray).forEach((roomKey, index) => {
    const room = roomNamesArray[roomKey];
    formData.append(`room${index + 1}`, JSON.stringify({
      roomKey,
      roomType: room.roomType,
      bedType: room.bedType
    }));
  });
  console.log('form data is',formData)
    // 📤 Axios Post
    try {
      // const response = await axios.post(
      //   'http://yourserverurl.com/api/hotel/register', // replace with your API
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // );
      // console.log("✅ Response:", response.data);
      // alert("Hotel registered successfully");
  
      // Clear form
      // dispatch(hotelRegisterAsync(formData))
      // setHotelName('');
      // setOwnerNames({});
      // setStaffNamesArray({});
      // setHotelImagesArray({});


  setHotelName('');
    setSelectedOwnerList('Hotel Owner'); // default value
    setOwnerNames({});
    setTotalStaff('');
    setStaffNamesArray({});
    setRoomNamesArray({});
    setHotelImagesList('Hotel Images'); // default value
    setHotelImagesArray({});
    setTotalFloorArray({})
    setTotalFloors('')
    setTotalRooms({})
    setFloorObj({})
    } catch (error) {
      console.log("❌ Error submitting form:", error.response?.data || error.message);
      alert("Something went wrong");
    }
  };
return (
    <>
   <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontWeight: '600', fontSize: 22, paddingLeft: 25 }}>Register Details</Text>
      <View style={{flex:'1',justifyContent:'center',alignItems:'center'}}>
      <Image source={SignUpImage} style={{width:300,height:300,resizeMode:'contain'}} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom: isKeyboardVisible ? 100 : 200 }}>
        <View  style={{
              // position: `${selectedOwnerList?'relative':'absolute'}`,
              left: 0,
              right: 0,
              // when keyboard is visible, bottom is 0 so it's just above the keyboard
              // when keyboard hidden, keep fields about 10% from bottom
              // bottom: selectedOwnerList?null: isKeyboardVisible ? 0 : Dimensions.get('window').height * 0.1
              position: selectedOwnerList === 'Hotel Owner' || Object.keys(ownerNames).length === 0 ? 'absolute' : 'relative',
              bottom: selectedOwnerList === 'Hotel Owner'||Object.keys(ownerNames).length === 0 
                ? (isKeyboardVisible ? 0 : Dimensions.get('window').height * 0.1) 
                :null,
            
            }}>
        <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label="Hotel Name"
          mode="outlined"
          value={hotelName}
          onChangeText={(text)=>setHotelName(text)}
        />
        {formErrors.hotelName && (
  <Text style={{ color: 'red', marginTop: 4, paddingHorizontal: 16 }}>
    {formErrors.hotelName}
  </Text>
)}
      </View>       
      <View style={{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 15,
      marginTop:15
    }}>
      <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>
        <Picker
          selectedValue={selectedOwnerList}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOwnerList(itemValue)
          }>
         {
          pickerList.map((item)=>{
            return (
              <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
              onValueChange={(itemValue) => setSelectedOwnerList(itemValue)}
            />
            )
          })
         }
        </Picker>
      </View>
    </View> 
    <View style={{ marginTop: 10 }}>
  {Object.keys(ownerNames).map((key, index) => (
    <View key={key} style={{ marginBottom: 20 }}>
      {/* Owner Name */}
      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TextInput
          label={`Owner ${index + 1} Name `}
          mode="outlined"
          // value={values.ownerNames[key]?.name}
          value={ownerNames[key].name}
          onChangeText={(text) =>{
            // setFieldValue(`ownerNames.${key}.name`, text)
            // console.log(`Owner ${index + 1} Name:`, text);
            handleOwnerNameChange('name', text, index);
          }
          }
        />
        {formErrors[`ownerName_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`ownerName_${key}`]}
  </Text>
)}
      </View>

      {/* Owner Phone Number */}
      <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label={`Owner ${index + 1} Phone Number`}
          mode="outlined"
          value={ownerNames[key].phone}
          // value={values.ownerNames[key]?.phone}
          onChangeText={(text) =>{
            handleOwnerNameChange('phone', text, index)
            // setFieldValue(`ownerNames.${key}.phone`, text)
          }
          }
          // onBlur={handleBlur(`ownerNames.${key}.phone`)}
        />
        {formErrors[`ownerPhone_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`ownerPhone_${key}`]}
  </Text>
)}
      </View>
      
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
  <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
    {ownerNames[key]?.image ? (
      <>
        <Image source={{ uri: ownerNames[key].image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <Button
          mode="contained"
          style={{
            height: 40,
            borderRadius: 11,
            justifyContent: 'center',
            marginTop: 2
          }}
          buttonColor="rgba(234, 88, 12, 1)"
          onPress={() => uploadImage(key)} // pass owner key
          // onPress={() => uploadImage(key, setFieldValue)}
        >
          Change
        </Button>
      </>
    ) : (
      <>
        <Image source={avatar} style={{ width: 60, height: 60 }} />
        <Button
          mode="contained"
          style={{
            height: 40,
            borderRadius: 11,
            justifyContent: 'center',
            marginTop: 2
          }}
          buttonColor="rgba(234, 88, 12, 1)"
          onPress={() => uploadImage(key)} // pass owner key
          // onPress={() => uploadImage(key, setFieldValue)} 
        >
          Upload
        </Button>
      </>
    )}
  </View>
  {formErrors[`ownerImage_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`ownerImage_${key}`]}
  </Text>
)}
</View>
    </View>
  ))}
  {/* Staff */}
</View>

{Object.keys(ownerNames).length>0?<View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TextInput
          label={`Total Staff`}
          mode="outlined"
          onChangeText={(text)=>setTotalStaff(text)}         
        />
      </View>:null}

      {Object.keys(staffNamesArray).map((key, index) => {
        return(
          <View key={key}  style={{ marginBottom: 10 }}>
 <View  style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <TextInput
            label={`Staff ${index + 1} Name `}
            mode="outlined"
            value={staffNamesArray[key].name}
            onChangeText={(text) =>
              handleStaffDataChange('name', text, index)
            }
            // value={values.staffNames[key]?.name}
            // onChangeText={(text) =>
            //   setFieldValue(`staffNames.${key}.name`, text)
            // }
            // onBlur={handleBlur(`staffNames.${key}.name`)}
          />
           {formErrors[`staffName_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`staffName_${key}`]}
  </Text>
)}
        </View>
        {/* Staff Phone Number */}
      <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          label={`Staff ${index + 1} Phone Number`}
          mode="outlined"
          value={staffNamesArray[key].phone}
          onChangeText={(text) =>
            handleStaffDataChange('phone', text, index)
          }
        />
{formErrors[`staffPhone_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`staffPhone_${key}`]}
  </Text>
)}
      </View>
      <View style={{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 15,
      marginTop:15
    }}>
      <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>
        <Picker
          selectedValue={staffNamesArray[key].post}
          onValueChange={(itemValue) =>
            handleStaffDataChange('post', itemValue, index)
        }
        >
         {
          staffPostList.map((item)=>{
            return (
              <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
              onValueChange={(itemValue) => setSelectedStaffList(itemValue)}
            />
            )
          })
         }
        </Picker>
      </View>
      {formErrors[`staffPost_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`staffPost_${key}`]}
  </Text>
)}
    </View> 
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
  <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
    {staffNamesArray[key]?.image ? (
      <>
        <Image source={{ uri: staffNamesArray[key].image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <Button
          mode="contained"
          style={{
            height: 40,
            borderRadius: 11,
            justifyContent: 'center',
            marginTop: 2
          }}
          buttonColor="rgba(234, 88, 12, 1)"
          onPress={() => uploadStaffImage(key)} // pass owner key
          // onPress={() => uploadStaffImage(key, setFieldValue)} 
        >
          Change
        </Button>
      </>
    ) : (
      <>
        <Image source={avatar} style={{ width: 60, height: 60 }} />
        <Button
          mode="contained"
          style={{
            height: 40,
            borderRadius: 11,
            justifyContent: 'center',
            marginTop: 2
          }}
          buttonColor="rgba(234, 88, 12, 1)"
          onPress={() => uploadStaffImage(key)} // pass owner key
          // onPress={() => uploadStaffImage(key, setFieldValue)} 
        >
          Upload
        </Button>
      </>
    )}
  </View>
  {formErrors[`staffImage_${key}`] && (
  <Text style={{ color: 'red', marginTop: 4 }}>
    {formErrors[`staffImage_${key}`]}
  </Text>
)}
</View>
          </View>
        )
      })
    }
    {Object.keys(staffNamesArray).length>0?<View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TextInput
          label={`Total Rooms`}
          mode="outlined"
          onChangeText={(text)=>setTotalRooms(text)}         
        />
      </View>:null}

      {totalRooms.length>0?<View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TextInput
          label={`Total Floors`}
          mode="outlined"
          value={totalFloors}
          onChangeText={(val) =>setTotalFloors(val) }    
        />
      </View>:null}
      {
       totalFloors? floorData.map((floorItem,index)=>{
          return (
            <View key={index} style={{ paddingHorizontal: 16, marginBottom: 10 }}>
               <TextInput
          label={`${floorItem}`}
          mode="outlined"
          onChangeText={(val)=>floorSelect(val,floorItem)}   
          value={floorObj[floorItem]?.floorNumber || ''}  
        />
            </View>
          )
        }):null
      }

      {
        Object.entries(totalFloorArray).map(([roomKey,values],index)=>{
          console.log('data is',roomKey)
          console.log('data obj is',values)
          return (
      <View 
      key={roomKey}
      style={{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 15,
      marginTop:15
    }}>
             <Text style={{ fontWeight: '400', fontSize: 16, marginBottom: 5 }}>
          {roomKey}
        </Text>
      <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>
           <Picker
           label={roomKey}
           selectedValue={roomNamesArray[roomKey]?.roomType || ''}
           onValueChange={(itemValue) => handleRoomDataChange(roomKey, 'roomType', itemValue)}
           >
           {
            roomType.map((roomItem,index)=>{
              console.log('room item',roomItem)
              return (
               <Picker.Item 
                key={roomItem.value}
                label={roomItem.label}
                value={roomItem.value}
            />
              )
            })
           }
           </Picker>
            </View>

            <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginTop:8
      }}>
           <Picker
           label={roomKey}
           selectedValue={roomNamesArray[roomKey]?.bedType || ''}
           onValueChange={(itemValue) => handleRoomDataChange(roomKey, 'bedType', itemValue)}
           >
           {
            bedType.map((bedItem,index)=>{
              console.log('room item',bedItem)
              return (
               <Picker.Item 
                key={bedItem.value}
                label={bedItem.label}
                value={bedItem.value}
            />
              )
            })
           }
           </Picker>
            </View>
            </View>
          )
        })
      }
    { Object.keys(staffNamesArray).length>0?
    <View style={{ paddingHorizontal: 16, marginBottom: 10,marginTop:6 }}>
      <View style={{
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>
        <Picker
          onValueChange={(itemValue, itemIndex) =>
            setHotelImagesList(itemValue)
          }
        >
         {
          HotelImages.map((item)=>{
            return (
              <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
              onValueChange={(itemValue) => setHotelImagesList(itemValue)}
            />
            )
          })
         }
        </Picker>
      </View>
    </View>
    :null}

{Object.keys(hotelImagesArray).map((key, index) => (
  <View key={key} style={{ paddingHorizontal: 16, marginTop: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
      {hotelImagesArray[key]?.image ? (
        <>
          <Image source={{ uri: hotelImagesArray[key].image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <Button
            mode="contained"
            style={{
              height: 40,
              borderRadius: 11,
              justifyContent: 'center',
              marginTop: 2
            }}
            buttonColor="rgba(234, 88, 12, 1)"
            onPress={() => uploadHotelImage(key)} // 👈 pass correct key
          >
            Change
          </Button>
        </>
      ) : (
        <>
          <Image source={hotel} style={{ width: 60, height: 60 }} />
          <Button
            mode="contained"
            style={{
              height: 40,
              borderRadius: 11,
              justifyContent: 'center',
              marginTop: 8
            }}
            buttonColor="rgba(234, 88, 12, 1)"
            onPress={() => uploadHotelImage(key)} // 👈 pass correct key
          >
            Upload
          </Button>
        </>
      )}
    </View>
    {formErrors[`hotelImage_${key}`] && (
      <Text style={{ color: 'red', marginTop: 6 }}>
        {formErrors[`hotelImage_${key}`]}
      </Text>
    )}
  </View>
))}
   {Object.keys(hotelImagesArray).length>0?<View style={{ width: '100%', overflow: 'hidden' }}>
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                      onPress={registerFormSubmitHandler}
                    >
           SUBMIT
                    </Button>
      </View>:null}
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </>
)
}
export default SignUpForm