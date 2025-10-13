import React from "react";
import { View, Text, ScrollView,Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native"
const Hierarchy=({allStaff,allOwner})=>{
  // console.log('all stff',allStaff)
  const navigation=useNavigation()
  // console.log('all ',allOwner.length)
const manager=allStaff.filter((staff)=>staff.post==="Hotel Supervisor")
// console.log('manage',manager)
const staff=allStaff.filter((staff)=>staff.post!=="Hotel Supervisor")
// console.log('staff is',staff)
return (
    <>
      <ScrollView
      horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
          gap: 12,
          marginLeft:`${allOwner.filter(owner => Object.keys(owner).length > 0).length==1 
            && manager.length==1 && staff.length==1?120:allOwner.filter(owner => Object.keys(owner).length > 0).length==2 &&
            manager.length==1 && staff.length==2?40:allOwner.filter(owner => Object.keys(owner).length > 0).length==2 &&
            manager.length==1 && staff.length==1?60:0
          }`
        }}
      >
        {allOwner.filter(owner => Object.keys(owner).length > 0).length > 1 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginVertical: 10,
              gap: 20,
           
            }}
          >
            {allOwner
  .filter(owner => Object.keys(owner).length > 0)
  .map((owner, index) => (
    <Pressable
    key={index}
      onPress={() =>navigation.navigate('ProfileDetailsPage',{formData:owner,heading:'Owner Details',anotherHeading:'hierarchy'})} // 👈 yahan apna function likh
      style={{ alignItems: "center" }}
    >
      {/* Circle Image */}
      <Image
        source={{ uri: owner?.image }}
        style={{
          width: 75,
          height: 75,
          borderRadius: 50,
          backgroundColor: "#eee",
        }}
      />

      {/* Name Box */}
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#333" }}>
          {owner?.name}
        </Text>
      </View>

      {/* Vertical Line */}
      <View
        style={{
          width: 2,
          height: 30,
          backgroundColor: "black",
        }}
      />
    </Pressable>
  ))}

            
          </View>
          
        ):
        
        <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        {/* Circle Image */}
        <Image
          source={{ uri: allOwner[0]?.image }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 50,
            backgroundColor: "#eee",
          }}
        />
    
        {/* Name box */}
        <View
          style={{
            marginTop: 8,
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#333" }}>
            {allOwner[0]?.name}
          </Text>
        </View>
    
        {/* Single vertical line */}
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "black",
            marginTop: 5,
          }}
        />
      </View>
        
        }
        { allOwner.filter(owner => Object.keys(owner).length > 0).length > 1 ?<View
            style={{
              width:allOwner.filter(owner => Object.keys(owner).length > 0).length * 115, // dynamically stretch with owners
              height: 2,
              backgroundColor: "black",
              marginTop:-22
            }}
          />:null}
          {allOwner.filter(owner => Object.keys(owner).length > 0).length > 1?<View style={{flexDirection:'row',alignItems:'center'}}>
          <View
                  style={{
                    width: 2,
                    height: 30, // adjust line height as needed
                    backgroundColor: "black",
                    marginTop:-13
                  }}
                />
          </View>:null}
     <View style={{flexDirection:'row',alignItems:'center',marginLeft:`${manager.length==1?12:28}`,marginTop:`${manager.length==1?-22:0}`}}>
       {
        manager.map((manageObj,index)=>{
          return (
            <Pressable 
            onPress={() =>navigation.navigate('ProfileDetailsPage',{formData:manageObj,heading:'Manager Details',anotherHeading:'hierarchy'})} >
<View      key={index}>
                 <Image
                  source={{ uri: manageObj?.image }}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                    backgroundColor: "#eee",
                  
                  }}
                />
                 <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  alignItems: "center",
                  marginLeft:`${manager.length==1?-20:0}`
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#333" }}>
                  {manageObj?.name}
                </Text>
              
              </View>
            </View>
            </Pressable>
            
          )
        })
       }
     </View>
     <View style={{flexDirection:'row',alignItems:'center'}}>
          <View
                  style={{
                    width: 2,
                    height: 30, // adjust line height as needed
                    backgroundColor: "black",
                    marginTop:-13
                  }}
                />
          </View>
     <View style={{ alignItems: "center" }}>
  {/* Horizontal line */}
{ staff.length>1? <View
    style={{
      width: staff.length * 115, // adjust based on your spacing logic
      height: 2,
      backgroundColor: "black",
      marginTop:-12
    }}
  />:null}

  {/* Staff row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: staff.length * 115,
    }}
  >
    {staff.map((member, index) => (
  <Pressable
  key={index}
    onPress={() =>navigation.navigate('ProfileDetailsPage',{formData:member,heading:'Staff Details',anotherHeading:'hierarchy'})}
    style={{
      alignItems: "center",
      marginLeft: staff.length > 1 ? 0 : 20,
      marginTop: staff.length > 1 ? 0 : -12,
    }}
  >
    {/* Vertical line */}
    {staff.length > 1 ? (
      <View
        style={{
          width: 2,
          height: 30,
          backgroundColor: "black",
        }}
      />
    ) : null}

    {/* Image */}
    <Image
      source={{ uri: member?.image }}
      style={{
        width: 75,
        height: 75,
        borderRadius: 50,
        backgroundColor: "#eee",
      }}
    />

    {/* Name box */}
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#333" }}>
        {member?.name}
      </Text>
    </View>
  </Pressable>
))}

  </View>
</View>

      </ScrollView>
    </>
)
}
export default Hierarchy