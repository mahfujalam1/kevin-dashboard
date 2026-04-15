import React from "react";
import { FiBook, FiInfo, FiMessageSquare, FiMail } from "react-icons/fi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

const supportTopics = [
  {
    icon: <FiBook size={18} />,
    title: "Getting started",
    description:
      "New here? We'll walk you through setting up your account, navigating features, and making the most of the platform from day one.",
  },
  {
    icon: <FiInfo size={18} />,
    title: "Troubleshooting & FAQs",
    description:
      "Running into an issue? Check our frequently asked questions for fast answers to the most common problems users encounter.",
  },
  {
    icon: <FiMessageSquare size={18} />,
    title: "Live support",
    description:
      "Our support team is available weekdays from 9 AM – 6 PM. Expect a response within a few hours for most inquiries.",
  },
];

const SUPPORT_EMAIL = "kevinsmith2384@gmail.com";

function HelpSupport() {
  return (
    <div className="py-8 px-4 font-sans text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1 text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
          <MdOutlineHelpOutline size={13} />
          Help &amp; Support
        </span>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 leading-snug">
          How can we help you?
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          We're here to make sure your experience is smooth and hassle-free.
          Browse the sections below or reach out to us directly.
        </p>
      </div>

      {/* Support Cards */}
      <div className="flex flex-col gap-3 mb-6">
        {supportTopics.map((topic) => (
          <div
            key={topic.title}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:border-gray-300 transition-colors duration-150"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-700">
              {topic.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {topic.title}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-white border border-gray-300 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Still facing an issue?
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          If you couldn't find an answer above, our team is always happy to
          help. Send us a detailed description of the problem and we'll get back
          to you as soon as possible.
        </p>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-150"
        >
          <FiMail size={15} />
          Send an email
        </a>
      </div>

      {/* Footer Email */}
      <div className="border-t border-gray-200 pt-5 flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Support email</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <BsCircleFill size={8} className="text-green-500" />
          <span className="text-xs text-gray-400">Support online</span>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
