'use client';
import React, { useState } from 'react';
import Footer from '@/app/components/footer';
import CodeBlock from "@/app/visualizer/queue/operations/isempty/codeBlock";
import Content from "@/app/visualizer/queue/operations/isempty/content";
import ExploreOther from '@/app/components/ui/exploreOther';
import Quiz from '@/app/visualizer/queue/operations/isempty/quiz';
import BackToTop from '@/app/components/ui/backtotop';
import GoBackButton from "@/app/components/ui/goback";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [message, setMessage] = useState('Queue is empty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEmptyStatus, setIsEmptyStatus] = useState(true);

  // Enqueue operation (add to rear/right)
  const enqueue = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    setIsAnimating(true);
    setOperation(`Enqueuing "${inputValue}"...`);
    setIsEmptyStatus(false);

    setTimeout(() => {
      setQueue((prev) => [...prev, inputValue]);
      setOperation(null);
      setMessage(`"${inputValue}" added to queue`);
      setInputValue('');
      setIsAnimating(false);
    }, 800);
  };

  // Dequeue operation (remove from front/left)
  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      setIsEmptyStatus(true);
      return;
    }

    setIsAnimating(true);
    const dequeuedValue = queue[0];
    setOperation(`Dequeuing "${dequeuedValue}"...`);

    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
      setOperation(null);
      setMessage(`"${dequeuedValue}" removed from queue`);
      setIsAnimating(false);
      setIsEmptyStatus(queue.length === 1);
    }, 800);
  };

  // IsEmpty operation
  const checkEmpty = () => {
    setIsAnimating(true);
    setOperation('Checking if queue is empty...');

    setTimeout(() => {
      const empty = queue.length === 0;
      setIsEmptyStatus(empty);
      setOperation(null);
      setMessage(empty ? 'Queue is empty!' : 'Queue is not empty');
      setIsAnimating(false);
    }, 800);
  };

  // Reset queue
  const reset = () => {
    setQueue([]);
    setInputValue('');
    setOperation(null);
    setMessage('Queue cleared');
    setIsEmptyStatus(true);
  };

  return (
    <div className="min-h-screen max-h-auto bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
      <main className="container mx-auto px-6 pt-16 pb-4">
        {/* go back block here */}
        <div className="mt-10 sm:mt-10">
          <GoBackButton />
        </div>

        {/* main logic here */}
        <h1 className="text-4xl md:text-4xl mt-6 ml-10 font-bold text-left text-gray-900 dark:text-white mb-0">
          <span className="text-black dark:text-white">Queue - IsEmpty</span>
        </h1>
        <div className="bg-black border border-none dark:bg-gray-600 w-100 h-[2px] rounded-xl mt-2 mb-5"></div>
        <Content />
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
          Visualize isEmpty operation in real-time
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 p-2 border rounded dark:bg-gray-700 focus:ring-1 focus:ring-blue-500"
                disabled={isAnimating}
              />
              <button
                onClick={enqueue}
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 w-full sm:w-auto"
              >
                Enqueue
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                className="bg-none border border-black dark:border-white text-black dark:text-white disabled:border-blue-500 dark:disabled:border-blue-500 disabled:text-blue-500 dark:disabled:text-blue-500 px-4 py-2 rounded disabled:opacity-50"
              >
                Dequeue
              </button>
              <button
                onClick={checkEmpty}
                disabled={isAnimating}
                className="bg-none border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50"
              >
                IsEmpty
              </button>
              <button
                onClick={reset}
                className="bg-none border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isAnimating}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Queue Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            {/* Operation Status */}
            {operation && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {operation}
              </div>
            )}

            {/* Message Display */}
            <div
              className={`mb-6 p-3 rounded-lg ${
                message.includes("added")
                  ? "bg-green-100 dark:bg-green-900"
                  : message.includes("removed")
                  ? "bg-red-100 dark:bg-red-900"
                  : isEmptyStatus
                  ? "bg-purple-100 dark:bg-purple-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {message}
            </div>

            {/* Horizontal Queue - Left (Front) to Right (Rear) */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Front
                </span>
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  Rear
                </span>
              </div>

              {/* Queue elements */}
              <div className="min-h-[120px]">
                {queue.length === 0 ? (
                  <div
                    className={`text-center py-8 border-2 rounded-lg ${
                      isEmptyStatus
                        ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30"
                        : "border-dashed border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <span
                      className={`${
                        isEmptyStatus
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {isEmptyStatus ? "Queue is empty!" : "Queue is empty"}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-4">
                    {queue.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center transition-all duration-300"
                      >
                        <div
                          className={`w-16 sm:w-20 p-3 rounded-lg border-2 text-center font-medium ${
                            index === 0
                              ? "bg-green-500 text-white border-green-600"
                              : index === queue.length - 1
                              ? "bg-orange-500 text-white border-orange-600"
                              : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-8 mb-8">
          Test Your Knowledge before moving forward!
        </p>
        <Quiz />

        <CodeBlock />
        <ExploreOther
          title="Explore Other Operations"
          links={[
            { text: "Peek Front", url: "./peek-front" },
            { text: "Enqueue & Dequeue", url: "./enqueue-dequeue" },
            { text: "Is Full", url: "./isfull" },
          ]}
        />
      </main>
      <div className="bg-gray-700 z-10 h-[1px]"></div>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default QueueVisualizer;