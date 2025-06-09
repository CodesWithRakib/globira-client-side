import React from "react";

const Faq = () => {
  const faqData = [
    {
      id: 1,
      question: "What is the minimum order quantity (MOQ) for products?",
      answer:
        "Each product has a specified minimum order quantity (MOQ). You must order at least the MOQ to proceed with the purchase. The MOQ is clearly displayed on each product page.",
    },
    {
      id: 2,
      question: "Can I get discounts on bulk orders?",
      answer:
        "Yes! We offer tiered discounts on bulk purchases. The more you order, the better the price. Check the 'Exclusive Offers' section for current deals or contact our sales team for custom pricing.",
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      answer:
        "We accept payments via bank transfer, credit card, and select B2B financing partners. For large volume orders, customized payment terms can be discussed.",
    },
    {
      id: 4,
      question: "How long does shipping take for wholesale orders?",
      answer:
        "Shipping times depend on the order size and delivery location. Typically, domestic orders take 5-10 business days, while international orders may take 10-20 business days. Expedited options are available.",
    },
    {
      id: 5,
      question: "Can I request a sample before placing a bulk order?",
      answer:
        "Yes, sample orders are possible for many products. Please contact our support team or the respective supplier to request a sample.",
    },
    {
      id: 6,
      question: "Are all products sourced from verified suppliers?",
      answer:
        "Yes, we only work with verified and trusted suppliers to ensure product quality and consistency. Our platform is designed to maintain high standards across all categories.",
    },
  ];

  return (
    <div className="py-10 px-5 flex flex-col gap-3  dark:bg-zinc-950">
      <div className="text-center dark:text-white mb-5">
        <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
      </div>
      {faqData.map((faq) => (
        <div
          key={faq.id}
          className="collapse collapse-plus bg-white dark:bg-zinc-900 dark:text-white border border-base-300"
        >
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-semibold">{faq.question}</div>
          <div className="collapse-content text-sm">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
