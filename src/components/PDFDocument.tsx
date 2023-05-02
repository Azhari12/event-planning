import React, { FC } from "react";
import {
  Document,
  Page,
  Text,
  Font,
  Image,
  StyleSheet,
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
  //   item_description?: {
  //     ticket_category: string;
  //     ticket_price: number;
  //     ticket_quantity: number;
  //     sub_total: number;
  //   }[];
  grand_total: number | undefined;
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
  } = props;

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>Detail Transaction</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.header}>{to}</Text>
        <Text style={styles.header}>{from}</Text>
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
    paddingTop: 35,
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
