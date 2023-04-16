import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Alert from "../Components/Alert";

let state = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

export default function CheckoutPage() {
  let initialdetails = {
    firstname: "",
    lastname: "",
    house:"",
    landmark:"",
    city:"",
    district:"",
    state:"",
    pin:"",
    phone: "",
  };
  const toast = useToast();
  let alertdata = {
    title: " Invalid Input",
    description: "Please fill the details",
    status: "warning",
  };

  const [detail, setdetail] = React.useState(initialdetails);
  console.log(detail)
  const navigate = useNavigate();

  const handlebooking = () => {
    let flag=false;
    for(let key in detail)
    {
      if(detail[key]=="")
      { 
        toast(Alert(alertdata))
        flag=true;
        break
      }
    }
    if(!flag) navigate("/payment");
  };

  const handleChange = (el) => {
    setdetail({ ...detail, [el.target.name]: el.target.value });
  };
  // localStorage.setItem('purchase',4500)
  let totalprice = JSON.parse(localStorage.getItem("purchase"));
  let discount = totalprice * (5 / 100);
  let couponadd = totalprice ? 30 : 0;
  let payableamount = totalprice - discount - couponadd;
  return (
    <div>
      <Stack
        w="60%"
        border={"0px"}
        margin="auto"
        // shadow="base"
        p={2}
      >
        <VStack
          border="0px solid grey"
          p={4}
        >
          <Box border="1px solid teal.500" shadow="base" backgroundColor='teal.400' borderRadius='12px' w={{base:"80vw", sm: "55vw", md: "60%", lg: "60%" ,xl: "40%",'2xl': "40%",}} p="14px" mb="5px" display='grid' alignContent='center'>
          <Box>
            <HStack justifyContent="space-around">
              <Heading fontSize="17px" fontWeight="600" color="#303030">Total Amount</Heading>
              <Text fontSize='16px'  fontWeight="500" color="#ffffff" >09i</Text>
            </HStack>
            <HStack justifyContent="space-around">
              <Heading fontSize="17px" fontWeight="600" color="#303030">Price Drop</Heading>
              <Text fontSize='16px'  fontWeight="500" color="#ffffff" >-{discount}</Text>
            </HStack>
            <HStack justifyContent="space-around">
              <Heading fontSize="17px" fontWeight="600" color="#303030" >Discount </Heading>
              <Text fontSize='16px'  fontWeight="500" color="#ffffff" >-{couponadd}</Text>
            </HStack>
          </Box>
          <Divider border="1px solid #ffffff" m='5px 0px'></Divider>
          <HStack justifyContent="space-around">
            <Heading fontSize="17px" fontWeight="600" color="#303030" >Payable Amount</Heading>
            <Text fontSize='16px'  fontWeight="500" color="#ffffff" s>{payableamount}</Text>
          </HStack>
        </Box>
        <Divider border="1px solid grey.500" ></Divider>
          <Text border="1px  red" width="80vw" fontSize='17px' className='' fontWeight="500" color="#727272" textAlign="center">
            Yay! You just saved {discount + couponadd}$ on this order!
          </Text>
          <Stack textAlign="start" shadow="lg" p="40px">
            <Heading size="md">Delivery Details</Heading>
            <Stack>
              <Stack direction={{base:"column", sm: "column", md: "row", lg: "row" ,xl: "row",'2xl': "row",}} >
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={handleChange}
                />
              </Stack>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Stack>
                  <Input
                    type="text"
                    name="house"
                    placeholder="House/Flat Number"
                    onChange={handleChange}
                  ></Input>
                  <Input
                    type="text"
                    name="landmark"
                    placeholder="Landmark/Locality"
                    onChange={handleChange}
                  ></Input>

                  <Stack direction="row">
                    <Input
                      type="text"
                      placeholder="City"
                      name="city"
                      onChange={handleChange}
                    />
                    <Input
                      type="text"
                      placeholder="District"
                      name="district"
                      onChange={handleChange}
                    />
                  </Stack>

                  <Stack direction="row">
                    <Select placeholder="State" name="state" onChange={handleChange}>
                      {state.map((each) => {
                        return <option value={each} key={each}>{each}</option>;
                      })}
                    </Select>
                    <Input
                      type="number"
                      placeholder="PIN Number"
                      name="pin"
                      onChange={handleChange}
                    />
                  </Stack>
                </Stack>
              </FormControl>
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input placeholder="Mobile Number" type="text" name="phone" onChange={handleChange}/>
                <FormHelperText mb="18px">Delivery Agent will use this number to contact for delivery.</FormHelperText>
              </FormControl>
            </Stack>
          <Button bg="teal.400" mt="10px" color="#ffff" fontSize="18px" onClick={handlebooking}>
            Complete the purchase
          </Button>
          </Stack>
        </VStack>
      </Stack>
    </div>
  );
}
