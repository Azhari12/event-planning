interface EventsType {
  title: string;
  description: string;
  hosted_by: string;
  date: string;
  time: string;
  status: string;
  category: string;
  location: string;
  event_picture: string;
  tickets: {
    ticket_category: string;
    ticket_price: number;
    ticket_quantitiy: number;
  }[];
}

export default EventsType;
