import intro from '../../assets/privacyIcon/intro.png'
import collect from '../../assets/privacyIcon/collect.png'
import contact from '../../assets/privacyIcon/contact.png'
import dataResponse from '../../assets/privacyIcon/dataResponse.png'
import dataSecure from '../../assets/privacyIcon/dataSecure.png'
import infoUsed from '../../assets/privacyIcon/infoUsed.png'
import pay from '../../assets/privacyIcon/pay.png'
import policyUpdate from '../../assets/privacyIcon/policyUpdate.png'
import roleBased from '../../assets/privacyIcon/roleBased.png'
export const privacyPolicyData = [
    {
      title: "Introduction",
      points: [
        "This Application is developed and maintained by Aayush Tapadia to provide hotel management and room booking services to registered hotels and their authorized staff.",
        "The initial concept and product idea for this Application were discussed and supported by Diptanshu Chouhan ",
        "Hotels using this Application act as independent Data Controllers for the customer information they collect and manage.",
        "The Developer acts solely as a Technology Service Provider."
      ],
      img:intro
    },
    {
      title: "Information We Collect",
      points: [
        "Guest Name",
        "Contact Number",
        "Identification Details (if required by hotel)",
        "Check-in / Check-out Details",
        "Room Assignment",
        "Booking Records",
        "Mobile Number (OTP-based authentication)",
        "Associated Hotel Access Details"
      ],
      img:collect
    },
    {
      title: "How Information Is Used",
      points: [
        "Managing room bookings",
        "Assigning rooms",
        "Updating cleaning and maintenance status",
        "Managing staff access",
        "Generating operational reports",
        "Supporting legal or regulatory compliance (if required by hotel)"
      ],
      img:infoUsed
    },
    {
      title: "Role-Based Access",
      points: [
        "Access to data is controlled by the hotel owner.",
        "Owners may manage rooms, floors, and staff.",
        "Owners may access reports and view performance data.",
        "Staff may add and manage bookings.",
        "Staff may update room status.",
        "Staff may checkout customers.",
        "Staff may view limited reports (as permitted)."
      ],
      img:roleBased
    },
    {
      title: "Data Responsibility",
      points: [
        "Hotels are responsible for accuracy of customer information.",
        "Hotels are responsible for legal compliance.",
        "Hotels are responsible for proper use of stored data.",
        "The Developer provides technical infrastructure only and does not control how hotels use customer data."
      ],
      img:dataResponse
    },
    {
      title: "Data Security",
      points: [
        "OTP-based login",
        "Role-based access control",
        "Secure database storage",
        "Encrypted communication"
      ],
      img:dataSecure
    },
    {
      title: "Payments",
      points: [
        "Payments (if enabled) are processed securely through third-party payment gateways.",
        "The Application does not store card or banking details."
      ],
      img:pay
    },
    {
      title: "Policy Updates",
      points: [
        "This Privacy Policy may be updated from time to time.",
        "Continued use of the Application indicates acceptance of the updated policy."
      ],
      img:policyUpdate
    },
    {
        title: "Contact",
        points: [
          "Aayush Tapadia",
          "Diptanshu Chouhan",
          "hoteloptix@gmail.com",
          "HotelOptix"
        ],
        img:contact
      }
  ];