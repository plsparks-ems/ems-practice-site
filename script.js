document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('generate-btn');
  const questionContainer = document.getElementById('question-container');
  const categorySelect = document.getElementById('category-select');

  // Insert current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  btn.addEventListener('click', async () => {
    const selectedCategory = categorySelect.value;
    questionContainer.textContent = 'Generating question...';

    try {
      const response = await fetch('/.netlify/functions/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: selectedCategory }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      questionContainer.textContent = data.question || 'No question returned.';
    } catch (error) {
      console.error(error);
      questionContainer.textContent = 'Error generating question.';
    }
  });
});
