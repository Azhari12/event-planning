import React, { FC } from "react";
import {
  Document,
  Page,
  Text,
  Font,
  Image,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

interface Props {
  title: string | undefined;
  to: string | undefined;
  from: string | undefined;
  amount: number | undefined;
  invoice: string | undefined;
  event_date: string | undefined;
  event_time: string | undefined;
  status: string | undefined;
  payment_method: string | undefined;
  item_description?: {
    ticket_category?: string;
    ticket_price?: number;
    ticket_quantity?: number;
    subtotal?: number;
  }[];
  grand_total: number | undefined;
  event_picture?: string;
}

const PDFDocument: FC<Props> = (props) => {
  const {
    title,
    to,
    from,
    amount,
    invoice,
    event_date,
    event_time,
    status,
    payment_method,
    grand_total,
    item_description,
    event_picture,
  } = props;

  return (
    <Document>
      <Page style={styles.body}>
        <View style={{ padding: "10mm" }}>
          <Text
            style={{
              fontFamily: "Oswald",
              fontSize: "22pt",
              marginBottom: "5mm",
            }}
          >
            {title}'s Ticket
          </Text>
          <Text style={{ fontFamily: "Oswald", fontSize: "16pt" }}>
            {`Invoice: ${invoice}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10mm",
            }}
          >
            <Text style={{ fontFamily: "Oswald", fontSize: "14pt" }}>Item</Text>
            <Text style={{ fontFamily: "Oswald", fontSize: "14pt" }}>
              Quantity
            </Text>
            <Text style={{ fontFamily: "Oswald", fontSize: "14pt" }}>
              Subtotal
            </Text>
          </View>
          {item_description?.map((item) => (
            <View
              key={item.ticket_category}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5mm",
              }}
            >
              <Text style={{ fontFamily: "Oswald", fontSize: "12pt" }}>
                {item.ticket_category}
              </Text>
              <Text style={{ fontFamily: "Oswald", fontSize: "12pt" }}>
                {item.ticket_quantity}
              </Text>
              <Text style={{ fontFamily: "Oswald", fontSize: "12pt" }}>
                {`Rp${item.subtotal}`}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10mm",
            }}
          >
            <Text style={{ fontFamily: "Oswald", fontSize: "14pt" }}>
              Total
            </Text>
            <Text style={{ fontFamily: "Oswald", fontSize: "14pt" }}>
              {`Rp${grand_total}`}
            </Text>
          </View>
          {/* <Text style={styles.header}>Detail Transaction</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.header}>{to}</Text>
          <Text style={styles.header}>{from}</Text> */}
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 0,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default PDFDocument;
