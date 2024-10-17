// import { styled } from "@mui/material/styles";
// import ButtonBase from "@mui/material/ButtonBase";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import { useNavigate } from "react-router-dom";

// const images = [
//   {
//     url: "../intro.png",
//     title: "Intro to Financial Accounting",
//     width: 300,
//     path: "Taxation",
//   },
//   {
//     url: "../finance.png",
//     title: "Financial Statements",
//     width: 300,
//     path: "Test",
//   },
//   {
//     url: "../tax.png",
//     title: "Taxation",
//     width: 300,
//     path: "./Quiz3",
//   },

//   {
//     url: "../debitcredit.png",
//     title: "Debits and Credits",
//     width: 300,
//     path: "",
//   },
//   {
//     url: "../cash.png",
//     title: "Accrual vs. Cash Accounting",
//     width: 300,
//     path: "",
//   },
// ];

// const ImageButton = styled(ButtonBase)(({ theme }) => ({
//   position: "relative",
//   height: 200,
//   width: 300,
//   display: "inline-block",
//   flexShrink: 0, // Prevent shrinking when more images are added
//   [theme.breakpoints.down("sm")]: {
//     width: "100% !important",
//     height: 100,
//   },
//   "&:hover, &.Mui-focusVisible": {
//     zIndex: 1,
//     "& .MuiImageBackdrop-root": {
//       opacity: 0.15,
//     },
//     "& .MuiImageMarked-root": {
//       opacity: 0,
//     },
//     "& .MuiTypography-root": {
//       border: "4px solid currentColor",
//     },
//   },
// }));

// const ImageSrc = styled("span")({
//   position: "absolute",
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   backgroundSize: "cover",
//   backgroundPosition: "center 40%",
// });

// const Image = styled("span")(({ theme }) => ({
//   position: "absolute",
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: theme.palette.common.white,
// }));

// const ImageBackdrop = styled("span")(({ theme }) => ({
//   position: "absolute",
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   backgroundColor: theme.palette.common.black,
//   opacity: 0.4,
//   transition: theme.transitions.create("opacity"),
// }));

// const ImageMarked = styled("span")(({ theme }) => ({
//   height: 3,
//   width: 18,
//   backgroundColor: theme.palette.common.white,
//   position: "absolute",
//   bottom: -2,
//   left: "calc(50% - 9px)",
//   transition: theme.transitions.create("opacity"),
// }));

// export default function ButtonBaseDemo() {
//   const navigate = useNavigate();
//   return (
//     <Paper
//       sx={{
//         width: "100%",
//         height: 250,
//         display: "flex",
//         overflowX: "auto", // Enable horizontal scrolling
//         whiteSpace: "nowrap", // Prevent wrapping of items
//         border: "1px solid #ddd",
//       }}
//     >
//       {images.map((image) => (
//         <>
//           <ImageButton
//             focusRipple
//             key={image.title}
//             style={{
//               width: image.width,
//             }}
//             onClick={() => navigate(image.path)}
//           >
//             <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
//             <ImageBackdrop className="MuiImageBackdrop-root" />
//             <Image>
//               <Typography
//                 component="span"
//                 variant="subtitle1"
//                 color="inherit"
//                 sx={(theme) => ({
//                   position: "relative",
//                   p: 4,
//                   pt: 2,
//                   pb: `calc(${theme.spacing(1)} + 6px)`,
//                 })}
//               >
//                 {image.title}
//                 <ImageMarked className="MuiImageMarked-root" />
//               </Typography>
//             </Image>
//           </ImageButton>
//         </>
//       ))}
//     </Paper>
//   );
// }

import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { useRef } from "react";

const images = [
  {
    url: "../intro.png",
    title: "Intro to Financial Accounting",
    width: 300,
    path: "Taxation",
  },
  {
    url: "../finance.png",
    title: "Financial Statements",
    width: 300,
    path: "",
  },
  {
    url: "../tax.png",
    title: "Taxation",
    width: 300,
    path: "",
  },
  {
    url: "../debitcredit.png",
    title: "Debits and Credits",
    width: 300,
    path: "",
  },
  {
    url: "../cash.png",
    title: "Accrual vs. Cash Accounting",
    width: 300,
    path: "",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  width: 300,
  display: "inline-block",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBaseDemo() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: 250,
        display: "flex",
        overflowX: "auto", // Enable horizontal scrolling
        whiteSpace: "nowrap", // Prevent wrapping of items
        position: "relative", // So arrows are positioned correctly
        border: "1px solid #ddd",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      }}
      ref={scrollRef}
    >
      {/* Left Scroll Arrow */}
      <IconButton
        onClick={() => scroll(-300)} // Scroll left by 300px
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => navigate(image.path)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={(theme) => ({
                position: "relative",
                p: 4,
                pt: 2,
                pb: `calc(${theme.spacing(1)} + 6px)`,
              })}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}

      {/* Right Scroll Arrow */}
      <IconButton
        onClick={() => scroll(300)} // Scroll right by 300px
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  );
}
