export const howToUseAppData = [
    {
      id: 1,
      title: "Login to the App",
      description:
        "To start using the system, you must log in using your mobile number.",
      steps: [
        "Open the app.",
        "Enter your registered mobile number.",
        "Tap Send OTP.",
        "Enter the OTP received on your phone.",
        "Tap Verify / Login.",
        "After successful verification, you will be logged into the system.",
        "If you do not have an account, tap Sign Up to create one."
      ]
    },
    {
      id: 2,
      title: "Register Your Hotel",
      description:
        "After signing up, the hotel owner needs to register the hotel or guest house in the system.",
      steps: [
        "Tap Sign Up / Register.",
        "Enter the Hotel Name.",
        "Enter the Owner Name.",
        "Add the Hotel Address.",
        "Enter the City / Location.",
        "Add the Contact Phone Number.",
        "Provide other required details about the hotel.",
        "Tap Register / Save.",
        "Once completed, your hotel will be created in the system and you can start managing it."
      ]
    },
    {
      id: 3,
      title: "Access the Room Preview",
      description:
        "After login and registration, you will reach the Room Preview where you can see the complete hotel overview.",
      steps: [
        "View all floors.",
        "View all rooms.",
        "Check room availability.",
        "See booked rooms.",
        "Monitor overall hotel status."
      ]
    },
    {
      id: 4,
      title: "Add Floors to Your Hotel",
      description:
        "Hotel owner can create floors to organize rooms in a structured way.",
      steps: [
        "Go to the Room Preview.",
        "Tap Add Floor.",
        "Enter the Floor Name (e.g., Ground Floor, First Floor, Second Floor).",
        "Tap Save.",
        "The new floor will appear on your dashboard."
      ]
    },
    {
      id: 5,
      title: "Add Rooms Under Each Floor",
      description:
        "hotel owner can add rooms under each floor to manage room availability.",
      steps: [
        "Open the floor where you want to add rooms.",
        "Tap Add Room.",
        "Enter the Room Number.",
        "Select the Room Type (Single Room, Double Room, Hall).",
        "Tap Save.",
        "The room will appear under the selected floor."
      ]
    },
    {
      id: 6,
      title: "Check-In a Guest",
      description:
        "When a guest arrives, you can assign them a room using the check-in feature.",
      steps: [
        "Go to the Room Preview.",
        "Select an available room.",
        "Enter the Guest Name.",
        "Enter the Phone Number.",
        "Add other required guest details.",
        "Tap Check-In.",
        "The room status will change to Booked."
      ]
    },
    {
        id: 7,
        title: "Advance Booking",
        description:
          "Reserve a room for a guest in advance by selecting a future date and entering guest details.",
        steps: [
          "Go to the Advance Booking section.",
          "Select the Room you want to reserve for a guest.",
          "Choose the future check-in date for the booking.",
          "Enter the required Guest Details such as Guest Name,Contact Number,Additional information (if required)",
          "Tap Confirm Booking to create the advance reservation.",
          "The booking can be cancelled anytime before the selected booking date.",
          "Once the selected date arrives, the guest must complete the check-in process for that room."
        ]
      },
    {
      id: 8,
      title: "Monitor Room Status",
      description:
        // "The app allows staff to quickly check room availability using room status indicators.",
        "Room status may appear with different labels or colors.",
      steps: [
        "Available Room – The room border colour should be either blue or green depend on room type(Ac or Non Ac).",
        "Booked Room – The room border colour should be red colour",
        "Advance Booked Room – The room border colour should be pink colour",
        "Use this information to assign rooms quickly."
      ]
    },
    {
      id: 9,
      title: "Room Cleaning Management",
      description:
        "The cleaning feature allows you to maintain hygiene standards by marking rooms for cleaning. Cleaning can be performed whether the room is currently booked or vacant.",
      steps: [
        "Open the Room Preview from the dashboard.",
        "You will see multiple floors along with a Maintenance option for each floor.",
        "Select the Maintenance option for the floor where you want to perform cleaning.",
        "On the next screen, the list of rooms for that floor will appear.",
        "Select the room that requires cleaning.",
        "Choose the Cleaning option to start the cleaning process.",
        "Once the cleaning is completed, follow the same process again and update the room status accordingly."
      ]
    },
    {
      id: 10,
      title: "Room Maintenance Management",
      description:
        "The maintenance feature allows you to mark rooms that require repair or technical inspection. Maintenance can only be applied when the room is vacant.",
      steps: [
        "Open the Room Preview from the dashboard.",
        "You will see multiple floors along with a Maintenance option for each floor.",
        "Select the Maintenance option for the floor where maintenance is required.",
        "The next screen will display the list of rooms for that floor.",
        "Select the room that needs maintenance.",
        "Choose the Maintenance option to mark the room under maintenance.",
        "Maintenance can only be performed when the room is vacant.",
        "After the maintenance work is completed, follow the same process again to update the room status."
      ]
    },
    {
      id: 11,
      title: "Customer Report Generation",
      description:
        "The report section allows you to generate detailed customer reports. Reports can be filtered by date and exported as a PDF file, which can be shared with authorities or for internal records.",
      steps: [
        "Open the Report section from the dashboard.",
        "Select the type of report you want to generate.",
        "You can choose between Personal Report or Police Report.",
        "Select the date filter such as Today, Yesterday, or Custom Date.",
        "The system will display the list of customers based on the selected filter.",
        "Review the customer details shown in the report.",
        "Tap the Generate PDF option to create the report document.",
        "Once the PDF is generated, you can download it or share it with anyone directly from the app."
      ]
    },
    {
      id: 12,
      title: "Police Report Generation",
      description:
        "The police report feature helps you to generate official guest records required by local authorities. The system automatically compiles guest details and allows them to be exported as a PDF for submission.",
      steps: [
        "Open the Report section from the dashboard.",
        "Select Police Report from the report type options.",
        "Choose the date filter such as Today, Yesterday, or Custom Date.",
        "The system will retrieve guest details based on the selected date range.",
        "Verify the guest information displayed in the report.",
        "Tap Generate PDF to create the police report document.",
        "Download or share the generated PDF with the relevant authorities if required."
      ]
    },
    {
      id:13,
      title: "Manage Staff and Profile",
      description:
        "Hotel owner can manage staff and profile information from the profile section.",
      steps: [
        "Add new staff members",
        "Update staff details",
      "Remove staff details"
      ]
    },
    {
        id: 14,
        title: "Free Trial & Subscription",
        description:
          "Hotel owners receive a 7-day free trial to explore all features of the app.After the trial ends, the owner must purchase a subscription plan to continue using the service.",
        steps: [
          "Every newly registered hotel receives a 7-day free trial to use the application",
          "During the free trial period, users can access all available features of the app.",
        "After the 7-day trial period ends, a subscription plan is required to continue using the system.",
        "To activate a plan, go to the Payment / Subscription section in the app.",
        "Select the subscription plan that best suits your needs.",
        "Complete the payment process to activate your subscription.",
        "If your subscription expires, you will need to renew it to continue using the application.",
        "Renewal can be done by following the same process in the Payment / Subscription section."
        ]
      }
  ];
  //manager
  export const HotelSuperviseData=[
    {
      id: 1,
      title: "Login to the App",
      description:
        "To start using the system, you must log in using your mobile number.",
      steps: [
        "Open the app.",
        "Enter your registered mobile number.",
        "Tap Send OTP.",
        "Enter the OTP received on your phone.",
        "Tap Verify / Login.",
        "After successful verification, you will be logged into the system.",
        "If you do not have an account, tap Sign Up to create one."
      ]
    },
    {
      id:2,
      title: "Access the Room Preview",
      description:
        "After login and registration, you will reach the Room Preview where you can see the complete hotel overview.",
      steps: [
        "View all floors.",
        "View all rooms.",
        "Check room availability.",
        "See booked rooms.",
        "Monitor overall hotel status."
      ]
    },
    {
      id:3,
      title: "Check-In a Guest",
      description:
        "When a guest arrives, you can assign them a room using the check-in feature.",
      steps: [
        "Go to the Room Preview.",
        "Select an available room.",
        "Enter the Guest Name.",
        "Enter the Phone Number.",
        "Add other required guest details.",
        "Tap Check-In.",
        "The room status will change to Booked."
      ]
    },
    {
        id:4,
        title: "Advance Booking",
        description:
          "Reserve a room for a guest in advance by selecting a future date and entering guest details.",
        steps: [
          "Go to the Advance Booking section.",
          "Select the Room you want to reserve for a guest.",
          "Choose the future check-in date for the booking.",
          "Enter the required Guest Details such as Guest Name,Contact Number,Additional information (if required)",
          "Tap Confirm Booking to create the advance reservation.",
          "The booking can be cancelled anytime before the selected booking date.",
          "Once the selected date arrives, the guest must complete the check-in process for that room."
        ]
      },
      {
        id:5,
        title: "Monitor Room Status",
        description:
          // "The app allows staff to quickly check room availability using room status indicators.",
          "Room status may appear with different labels or colors.",
        steps: [
          "Available Room – The room border colour should be either blue or green depend on room type(Ac or Non Ac).",
          "Booked Room – The room border colour should be red colour",
          "Advance Booked Room – The room border colour should be pink colour",
          "Use this information to assign rooms quickly."
        ]
      },
      {
        id:6,
        title: "Room Cleaning Management",
        description:
          "The cleaning feature allows you to maintain hygiene standards by marking rooms for cleaning. Cleaning can be performed whether the room is currently booked or vacant.",
        steps: [
          "Open the Room Preview from the dashboard.",
          "You will see multiple floors along with a Maintenance option for each floor.",
          "Select the Maintenance option for the floor where you want to perform cleaning.",
          "On the next screen, the list of rooms for that floor will appear.",
          "Select the room that requires cleaning.",
          "Choose the Cleaning option to start the cleaning process.",
          "Once the cleaning is completed, follow the same process again and update the room status accordingly."
        ]
      },
      {
        id:7,
        title: "Room Maintenance Management",
        description:
          "The maintenance feature allows you to mark rooms that require repair or technical inspection. Maintenance can only be applied when the room is vacant.",
        steps: [
          "Open the Room Preview from the dashboard.",
          "You will see multiple floors along with a Maintenance option for each floor.",
          "Select the Maintenance option for the floor where maintenance is required.",
          "The next screen will display the list of rooms for that floor.",
          "Select the room that needs maintenance.",
          "Choose the Maintenance option to mark the room under maintenance.",
          "Maintenance can only be performed when the room is vacant.",
          "After the maintenance work is completed, follow the same process again to update the room status."
        ]
      },
      {
        id:8,
        title: "Customer Report Generation",
        description:
          "The report section allows you to generate detailed customer reports. Reports can be filtered by date and exported as a PDF file, which can be shared with authorities or for internal records.",
        steps: [
          "Open the Report section from the dashboard.",
          "Select the type of report you want to generate.",
          "You can choose between Personal Report or Police Report.",
          "Select the date filter such as Today, Yesterday, or Custom Date.",
          "The system will display the list of customers based on the selected filter.",
          "Review the customer details shown in the report.",
          "Tap the Generate PDF option to create the report document.",
          "Once the PDF is generated, you can download it or share it with anyone directly from the app."
        ]
      },
      {
        id:9,
        title: "Police Report Generation",
        description:
          "The police report feature helps hotels generate official guest records required by local authorities. The system automatically compiles guest details and allows them to be exported as a PDF for submission.",
        steps: [
          "Open the Report section from the dashboard.",
          "Select Police Report from the report type options.",
          "Choose the date filter such as Today, Yesterday, or Custom Date.",
          "The system will retrieve guest details based on the selected date range.",
          "Verify the guest information displayed in the report.",
          "Tap Generate PDF to create the police report document.",
          "Download or share the generated PDF with the relevant authorities if required."
        ]
      },
      {
        id:10,
        title: "Manage Staff and Profile",
        description:
          "Hotel supervisor can manage staff and profile information from the profile section.",
        steps: [
          "Add new staff members",
          "Update staff details",
        "Remove staff details"
        ]
      },
  ]


  //general staff
  export const generalStaffData=[
    {
      id: 1,
      title: "Login to the App",
      description:
        "To start using the system, you must log in using your mobile number.",
      steps: [
        "Open the app.",
        "Enter your registered mobile number.",
        "Tap Send OTP.",
        "Enter the OTP received on your phone.",
        "Tap Verify / Login.",
        "After successful verification, you will be logged into the system.",
        "If you do not have an account, tap Sign Up to create one."
      ]
    },
    {
      id:2,
      title: "Access the Room Preview",
      description:
        "After login and registration, you will reach the Room Preview where you can see the complete hotel overview.",
      steps: [
        "View all floors.",
        "View all rooms.",
        "Check room availability.",
        "See booked rooms.",
        "Monitor overall hotel status."
      ]
    },
    {
      id:3,
      title: "Check-In a Guest",
      description:
        "When a guest arrives, you can assign them a room using the check-in feature.",
      steps: [
        "Go to the Room Preview.",
        "Select an available room.",
        "Enter the Guest Name.",
        "Enter the Phone Number.",
        "Add other required guest details.",
        "Tap Check-In.",
        "The room status will change to Booked."
      ]
    },
    {
        id:4,
        title: "Advance Booking",
        description:
          "Reserve a room for a guest in advance by selecting a future date and entering guest details.",
        steps: [
          "Go to the Advance Booking section.",
          "Select the Room you want to reserve for a guest.",
          "Choose the future check-in date for the booking.",
          "Enter the required Guest Details such as Guest Name,Contact Number,Additional information (if required)",
          "Tap Confirm Booking to create the advance reservation.",
          "The booking can be cancelled anytime before the selected booking date.",
          "Once the selected date arrives, the guest must complete the check-in process for that room."
        ]
      },
      {
        id:5,
        title: "Monitor Room Status",
        description:
          // "The app allows staff to quickly check room availability using room status indicators.",
          "Room status may appear with different labels or colors.",
        steps: [
          "Available Room – The room border colour should be either blue or green depend on room type(Ac or Non Ac).",
          "Booked Room – The room border colour should be red colour",
          "Advance Booked Room – The room border colour should be pink colour",
          "Use this information to assign rooms quickly."
        ]
      },
      {
        id:6,
        title: "Room Cleaning Management",
        description:
          "The cleaning feature allows you to maintain hygiene standards by marking rooms for cleaning. Cleaning can be performed whether the room is currently booked or vacant.",
        steps: [
          "Open the Room Preview from the dashboard.",
          "You will see multiple floors along with a Maintenance option for each floor.",
          "Select the Maintenance option for the floor where you want to perform cleaning.",
          "On the next screen, the list of rooms for that floor will appear.",
          "Select the room that requires cleaning.",
          "Choose the Cleaning option to start the cleaning process.",
          "Once the cleaning is completed, follow the same process again and update the room status accordingly."
        ]
      },
      {
        id:7,
        title: "Room Maintenance Management",
        description:
          "The maintenance feature allows you to mark rooms that require repair or technical inspection. Maintenance can only be applied when the room is vacant.",
        steps: [
          "Open the Room Preview from the dashboard.",
          "You will see multiple floors along with a Maintenance option for each floor.",
          "Select the Maintenance option for the floor where maintenance is required.",
          "The next screen will display the list of rooms for that floor.",
          "Select the room that needs maintenance.",
          "Choose the Maintenance option to mark the room under maintenance.",
          "Maintenance can only be performed when the room is vacant.",
          "After the maintenance work is completed, follow the same process again to update the room status."
        ]
      },
      {
        id:8,
        title: "Customer Report Generation",
        description:
          "The report section allows you to generate detailed customer reports. Reports can be filtered by date and exported as a PDF file, which can be shared with authorities or for internal records.",
        steps: [
          "Open the Report section from the dashboard.",
          "Select the type of report you want to generate.",
          "You can choose between Personal Report or Police Report.",
          "Select the date filter such as Today, Yesterday, or Custom Date.",
          "The system will display the list of customers based on the selected filter.",
          "Review the customer details shown in the report.",
          "Tap the Generate PDF option to create the report document.",
          "Once the PDF is generated, you can download it or share it with anyone directly from the app."
        ]
      },
      {
        id:9,
        title: "Police Report Generation",
        description:
          "The police report feature helps hotels generate official guest records required by local authorities. The system automatically compiles guest details and allows them to be exported as a PDF for submission.",
        steps: [
          "Open the Report section from the dashboard.",
          "Select Police Report from the report type options.",
          "Choose the date filter such as Today, Yesterday, or Custom Date.",
          "The system will retrieve guest details based on the selected date range.",
          "Verify the guest information displayed in the report.",
          "Tap Generate PDF to create the police report document.",
          "Download or share the generated PDF with the relevant authorities if required."
        ]
      },
    
  ]