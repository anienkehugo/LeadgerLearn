// import { Tabs, Tab, Box } from "@mui/material";
// import { useState } from "react";
// //import Introduction from "./Introduction";
// import Lesson1 from "./Lesson1";
// import Header from "./header";
// //import Quiz1 from "./Quiz";
// //import Quiz2 from "./Quiz2";
// //import Quiz3 from "./Quiz3";
// import Lesson2 from "./Lesson2";
// import Lesson3 from "./Lesson3";

// const TaxationCourse = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ display: "flex", position: "" }}>
//       <Header />
//       <Box
//         component="main"
//         sx={{
//           backgroundColor: (theme) =>
//             theme.palette.mode === "light"
//               ? theme.palette.grey[100]
//               : theme.palette.grey[900],
//           flexGrow: 1,
//           height: "100vh",
//           overflow: "auto",
//           p: 4, // Add padding for better spacing
//         }}
//       >
//         <br />
//         <Tabs value={value} onChange={handleChange}>
//           <Tab label="Lesson 1" />
//           <Tab label="Lesson 2" />
//           <Tab label="Lesson 3" />
//         </Tabs>
//         {value === 0 && <Lesson1 />}
//         {value === 1 && <Lesson2 />}
//         {value === 2 && <Lesson3 />}
//       </Box>
//     </Box>
//   );
// };

// export default TaxationCourse;

import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import Lesson1 from "./Lesson1";
import Lesson2 from "./Lesson2";
import Lesson3 from "./Lesson3";
import Header from "./header";

const TaxationCourse = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: 4, // Padding for spacing
        }}
      >
        <br />
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            ".MuiTabs-indicator": {
              backgroundColor: "linear-gradient(to right, #00d9e1, #01579b)", // Color for active tab indicator
              height: "4px", // Thicker indicator
            },
            ".MuiTab-root": {
              textTransform: "none", // Prevents uppercase styling of tab text
              fontSize: "1.1rem", // Adjust tab text size
              fontWeight: "bold", // Makes tab text bold
              px: 3, // Adds padding around the tabs for spacing
              py: 1, // Adds padding to increase height of tabs
            },
            ".Mui-selected": {
              color: "#01579b", // Color for the selected tab text
            },
          }}
        >
          <Tab label="Lesson 1" />
          <Tab label="Lesson 2" />
          <Tab label="Lesson 3" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {value === 0 && <Lesson1 />}
          {value === 1 && <Lesson2 />}
          {value === 2 && <Lesson3 />}
        </Box>
      </Box>
    </Box>
  );
};

export default TaxationCourse;
