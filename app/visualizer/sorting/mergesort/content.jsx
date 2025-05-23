const content = () => {
  const paragraph = [
    `Merge Sort is an efficient, stable, comparison-based sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the unsorted list into sublists until each sublist contains a single element, then repeatedly merges these sublists to produce new sorted sublists until there is only one sorted list remaining.`,
    `The log n factor comes from the division steps, while the n factor comes from the merge steps.`,
    `Merge Sort requires O(n) additional space for the temporary arrays during merging. This makes it not an in-place sorting algorithm, unlike Insertion Sort or Bubble Sort.`,
    `Merge Sort is particularly useful when sorting linked lists (where random access is expensive) and is the algorithm of choice for many standard library sorting implementations when stability is required. It's also commonly used in external sorting where data doesn't fit in memory.`,
  ];

  const divide = [
    { points : "Split the array into two halves: [38, 27, 43] and [3, 9, 82, 10]" },
    { points : "Recursively split each half until single elements remain" },
  ];

  const merge = [
    { points : "Merge single elements into sorted pairs: [27, 38], [3, 43], [9, 82], [10]" },
    { points : "Merge pairs: [3, 27, 38, 43] and [9, 10, 82]" },
    { points : "Final merge: [3, 9, 10, 27, 38, 43, 82]" },
  ];

  const algorithm = [
    { points : "Divide:",
      subpoints : [
        "Find the middle point to divide the array into two halves",
        "Recursively call merge sort on the first half",
        "Recursively call merge sort on the second half",
      ],
    },
    { points : "Merge:",
      subpoints : [
        "Create temporary arrays for both halves",
        "Compare elements from each half and merge them in order",
        "Copy any remaining elements from either half",
      ],
     },
  ];

  const timeComplexity = [
    { points : "Best Case: O(n log n) (already sorted, but still needs all comparisons)" },
    { points : "Average Case: O(n log n)" },
    { points : "Worst Case: O(n log n) (consistent performance)" },
  ];

  const advantages = [
    { points : "Stable sorting (maintains relative order of equal elements)" },
    { points : "Excellent for large datasets (consistent O(n log n) performance)" },
    { points : "Well-suited for external sorting (sorting data too large for RAM)" },
    { points : "Easily parallelizable (divide steps can be done concurrently)" },
  ];

  const disadvantages = [
    { points : "Requires O(n) additional space (not in-place)" },
    { points : "Slower than O(n²) algorithms for very small datasets due to recursion overhead" },
    { points : "Not as cache-efficient as some other algorithms (e.g., QuickSort)" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Merge Sort */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Merge Sort?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
        </p>
      </div>
    </section>

    {/* How Does It Work */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Consider this unsorted array: [38, 27, 43, 3, 9, 82, 10]
        </p>
        
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Divide Phase:</span>
            <ol className="mt-2 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {divide.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Merge Phase:</span>
            <ol className="mt-2 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {merge.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-300 overflow-x-auto">
              {`Original: 
[38, 27, 43, 3, 9, 82, 10]
Divide:   
[38,27,43][3,9,82,10]
Divide:   
[38][27,43] | [3,9][82,10]
Divide:   
[38][27][43] | [3][9][82][10]
Merge:    
[27,38][43] | [3,9][10,82]
Merge:    
[27,38,43] | [3,9,10,82]
Final:    
[3,9,10,27,38,43,82]`}
            </pre>
          </div>
        </div>
      </div>
    </section>

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {algorithm.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-semibold">{item.points}</span>
              {item.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
                  {item.subpoints.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Time Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {timeComplexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {item.points.split(':')[0]}:
              </span>
              <span className="ml-2">{item.points.split(':')[1]}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          {paragraph[1]}
        </p>
      </div>
    </section>

    {/* Space Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Space Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[2]}
        </p>
      </div>
    </section>

    {/* Advantages */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Advantages
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {advantages.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {items.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Disadvantages */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Disadvantages
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {disadvantages.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {items.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6">
      <div className="prose dark:prose-invert max-w-none">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph[3]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default content;