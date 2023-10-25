import { useState, useCallback, useRef, useEffect } from "react";
import {
    Page,
    Toast,
    Layout,
    Text,
    Card,
    Divider,
    Button,
    BlockStack,
    Box,
    List,
    Link,
    InlineStack,
    FormLayout,
    TextField,
    Select,
    DatePicker,
    Form,
    Frame

} from "@shopify/polaris";
import { useActionData } from "@remix-run/react";

export const action = async ({ request }) => {

};
const form = () => {
    const [selected, setSelected] = useState('collections');
    const [active, setActive] = useState(false);

    const handleSelectChange = (value) => {
        setSelected(value);
        console.log(value);
    }
    const options = [
        { label: 'Full Site', value: 'fullsite' },
        { label: 'Collections', value: 'collections' },
    ];
    const [collectionName, setcollectionName] = useState("");
    const [price, setPrice] = useState("");
    const [date, setdate] = useState("");
    const [loadingbtn, setloadingbtn] = useState(false);
    const handleMonthChange = (value) => {
        let date = new Date(value.target.value);
        console.log(date);
        setdate(value.target.value);
        console.log(value.target.value);

    };

    const handleSubmit = async () => {
        setloadingbtn(true);
        setActive(true);
        console.log("form submitted");
        let data = new Object();
        data.option = selected;
        data.collectionName = collectionName;
        data.price = price;
        data.option = date;
        console.log(JSON.stringify(data));

        //************* */ calling the final api call ************

        // const response = await fetch(apiUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json', // Set the appropriate content type
        //     },
        //     body: JSON.stringify(data), // Convert data to JSON format
        // });

        // // Handle the API response
        // if (response.ok) {
        //     const responseData = await response.json();
        //     return json(responseData);
        // } else {
        //     // Handle errors or non-2xx responses
        //     return json({ error: 'Failed to fetch data' }, { status: response.status });
        // }
    };


    // const toggleActive = useCallback(() => setActive((active) => !active), []);

    // const toastMarkup = ;
    return (
        <Page padding="200">
            <ui-title-bar title="Form" />
            <Card>
                <Text alignment="center" variant="heading2xl" as="h3">
                    Submit Basic Details
                </Text>
                <Form onSubmit={handleSubmit}>
                    <FormLayout >
                        <Select
                            label="Choose Option"
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                        />
                        {selected != "collections" ? "" : <TextField requiredIndicator required label="Enter Collection Name" value={collectionName} type="text" value={collectionName} onChange={(e) => { setcollectionName(e) }} autoComplete="off" />}

                        <TextField requiredIndicator label="Enter Percentage(%) of adjustment for @ price" value={price} type="number" value={price} onChange={(e) => { setPrice(e) }} autoComplete="off" />

                        <label htmlFor="datepicker" className="Polaris-Label__Text"> Select Date</label>
                        <input required placeholder="YYYY-MM-DD" onChange={handleMonthChange} className="Polaris-TextField__Input" type="date" name="date" id="datepicker" />
                        <Divider />
                        {loadingbtn ? <Button loading alignment="center" size="large">Submit</Button> : <Button submit alignment="center" size="large">Submit</Button>}
                    </FormLayout>
                </Form>

            </Card>
            {active ? (
                <Frame> <Toast content="Data sent" /></Frame>
            ) : null}
        </Page>
    )
}

export default form
// export function DatePickerExample() {
//     function nodeContainsDescendant(rootNode, descendant) {
//         if (rootNode === descendant) {
//             return true;
//         }
//         let parent = descendant.parentNode;
//         while (parent != null) {
//             if (parent === rootNode) {
//                 return true;
//             }
//             parent = parent.parentNode;
//         }
//         return false;
//     }
//     const [visible, setVisible] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [{ month, year }, setDate] = useState({
//         month: selectedDate.getMonth(),
//         year: selectedDate.getFullYear(),
//     });
//     const formattedValue = selectedDate.toISOString().slice(0, 10);
//     const datePickerRef = useRef(null);
//     function isNodeWithinPopover(node) {
//         return datePickerRef?.current
//             ? nodeContainsDescendant(datePickerRef.current, node)
//             : false;
//     }
//     function handleInputValueChange() {
//         console.log("handleInputValueChange");
//     }
//     function handleOnClose({ relatedTarget }) {
//         setVisible(false);
//     }
//     function handleMonthChange(month, year) {
//         setDate({ month, year });
//     }
//     function handleDateSelection({ end: newSelectedDate }) {
//         setSelectedDate(newSelectedDate);
//         setVisible(false);
//     }
//     useEffect(() => {
//         if (selectedDate) {
//             setDate({
//                 month: selectedDate.getMonth(),
//                 year: selectedDate.getFullYear(),
//             });
//         }
//     }, [selectedDate]);
//     return (
//         <BlockStack inlineAlign="center" gap="400">
//             <Box minWidth="276px" padding={{ xs: 200 }}>
//                 <Popover
//                     active={visible}
//                     autofocusTarget="none"
//                     preferredAlignment="left"
//                     fullWidth
//                     preferInputActivator={false}
//                     preferredPosition="below"
//                     preventCloseOnChildOverlayClick
//                     onClose={handleOnClose}
//                     activator={
//                         <TextField
//                             role="combobox"
//                             label={"Start date"}
//                             prefix={<Icon source={CalendarMinor} />}
//                             value={formattedValue}
//                             onFocus={() => setVisible(true)}
//                             onChange={handleInputValueChange}
//                             autoComplete="off"
//                         />
//                     }
//                 >
//                     <Card ref={datePickerRef}>
//                         <DatePicker
//                             month={month}
//                             year={year}
//                             selected={selectedDate}
//                             onMonthChange={handleMonthChange}
//                             onChange={handleDateSelection}
//                         />
//                     </Card>
//                 </Popover>
//             </Box>
//         </BlockStack>
//     )
// }