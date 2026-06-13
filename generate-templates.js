const fs = require('fs');
const path = require('path');

const demosDir = path.join(__dirname, 'public', 'demos');
const outputPath = path.join(__dirname, 'public', 'data', 'templates.json');

// Read all files in the demos directory
fs.readdir(demosDir, (err, files) => {
  if (err) {
    console.error('Error reading demos directory:', err);
    return;
  }

  // Filter for .html files
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  // Create template objects
  const templates = htmlFiles.map((file, index) => {
    const title = file.replace('.html', '').trim();
    return {
      title: title,
      description: `A beautifully crafted template for ${title}. Ready to be customized for your next project.`,
      featured: index < 4, // Make the first 4 featured
      status: "active",
      year: "2024",
      score: 95 + (index % 5), // Randomize score slightly between 95 and 99
      thumbnailEmoji: "🎨",
      thumbnailBg: `hsl(${(index * 35) % 360}, 40%, 15%)`, // Generate random dark colored backgrounds
      thumbnailUrl: "",
      tags: ["Template", "HTML", "CSS"],
      links: {
        demo: `https://stone-forze.github.io/public/demos/${file}`,
        github: ""
      }
    };
  });

  // Structure exactly like websites.json
  const jsonData = {
    category: "templates",
    subcategories: [
      {
        label: "Premium Templates",
        icon: "🎨",
        projects: templates
      }
    ]
  };

  // Write to templates.json
  fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing templates.json:', err);
    } else {
      console.log(`Successfully generated templates.json with ${templates.length} templates!`);
    }
  });
});
