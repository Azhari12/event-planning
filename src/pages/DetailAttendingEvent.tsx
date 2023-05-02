import { FC } from "react";
import Layout from "@/components/Layout";
import React from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import PDFDocument from "@/components/PDFDocument";

const DetailAttendingEvent: FC = () => {
  return (
    <Layout>
      <div className=" min-h-screen place-items-start lg:p-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/noah.jpg"
            className=" w-full h-full max-w-md max-h-[28rem] rounded-lg shadow-2xl object-cover"
          />
          <div className=" lg:pl-14">
            <h1 className="text-5xl font-bold capitalize">
              NOAH music concert
            </h1>
            <p className="py-6 text-[#4B5262]">
              Nowadays, it isn’t uncommon to see lenders rapidly adopting a
              digital lending strategy to streamline the lending process
              Gorgeous, high-quality design system for mobile, tablet & a few
              reasons digital Nowadays, it isn’t uncommon to see lenders rapidly
              adopting a digital lending strategy to streamline the lending
              process Gorgeous, high-quality design system for mobile, tablet &
              a few reasons digital Nowadays, it isn’t uncommon to see lenders
              rapidly adopting a digital lending strategy to streamline the
              lending process Gorgeous, high-quality design system for mobile,
              tablet & a few reasons digital
            </p>
            <div className=" flex justify-around text-lg font-bold">
              <div className=" w-48">
                <p>100 Joined</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  100 People were joined this event, we still waiting
                </p>
              </div>
              <div>
                <p>400 Ticket Alvailable</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  Don't let you run out of tickets
                </p>
              </div>
            </div>
            <div className=" flex flex-col border-2 rounded-lg p-5 mt-5">
              <p className=" font-bold tex-md">Time</p>
              <p>Monday, April 17 | 07.00 PM</p>
              <p className=" font-bold tex-md">Location</p>
              <p>Gelora Bung Karno - Jakarta</p>
              <p className=" font-bold tex-md mt-10">Hosted by NOAH</p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 rounded-lg m-4 p-5">
          <div className="flex flex-col  font-semibold justify-center">
            <p className=" text-base">2 Tickets Buyed</p>
            <div className=" flex items-center justify-between">
              <p className=" text-sm">1 V.I.P. Ticket</p>
              <p className="text-lg font-semibold"> Rp. 350000</p>
            </div>
            <div className=" flex items-center justify-between">
              <p className=" text-sm">1 Reguler Ticket</p>
              <p className="text-lg font-semibold"> Rp. 100000</p>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">Rp. 450000</p>
          </div>
          <div className=" flex justify-center items-center">
            <label
              htmlFor="my-modal-3"
              className="btn ml-2 bg-button mt-10 text-md rounded-lg"
            >
              Detail Transaction
            </label>
          </div>
        </div>
      </div>
      {/* modal */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className=" flex flex-col text-xs text-[#667085]">
            <h3 className="text-lg font-bold text-black">Detail Transaction</h3>
            <div className=" flex justify-around">
              <div className=" flex-col">
                <p>TO:</p>
                <p className=" text-base text-button font-semibold">NOAH</p>
                <p>NOAH@gmail.com</p>
              </div>
              <div className=" flex-col">
                <p>FROM:</p>
                <p className=" text-base text-button font-semibold">ILHAM</p>
                <p>Ilham@gmail.com</p>
              </div>
            </div>
            <p>INFO</p>
            <p className=" text-base text-button font-semibold">
              Amount: Rp. 450000
            </p>
            <div className="flex">
              <div className="flex flex-col">
                <p>Invoice</p>
                <p>Event Date</p>
                <p>Event Time</p>
                <p>Status</p>
                <p>Payment Type</p>
                <p>Payment Method</p>
              </div>
              <div className="flex flex-col">
                <p> : MT00002570</p>
                <p> : 2023-04-25</p>
                <p> : 19:00:00</p>
                <p> : completed</p>
                <p> : Paid</p>
                <p> : Credit Card</p>
              </div>
            </div>
            <div className="flex items-center">
              <p>Subject : </p>
              <p className=" text-base text-button font-semibold">
                NOAH MUSIC CONCERT
              </p>
            </div>
            <div className="flex justify-between border-b-2 border-black pb-3">
              <div className="flex flex-col">
                <p>ITEM DESCRIPTION</p>
                <p className=" text-sm text-button font-semibold mt-3">
                  V.I.P. Ticket
                </p>
                <p className=" text-sm text-button font-semibold">
                  Reguler Ticket
                </p>
              </div>
              <div className="flex flex-col">
                <p>QTY</p>
                <p className=" text-sm text-button font-semibold mt-3">1</p>
                <p className=" text-sm text-button font-semibold">1</p>
              </div>
              <div className="flex flex-col">
                <p>RATE</p>
                <p className=" text-sm text-button font-semibold mt-3">
                  350000
                </p>
                <p className=" text-sm text-button font-semibold">100000</p>
              </div>
              <div className="flex flex-col">
                <p>AMOUNT</p>
                <p className=" text-sm text-button font-semibold mt-3">
                  350000
                </p>
                <p className=" text-sm text-button font-semibold">100000</p>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-sm text-button font-semibold">Total</p>
              <p className=" text-sm text-button font-semibold">Rp. 450000</p>
            </div>
            <div className="flex justify-center">
              <button className="btn ml-2 bg-button mt-10 text-md rounded-lg">
                Print PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailAttendingEvent;
