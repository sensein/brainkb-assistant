// Backend Integration Example
// This shows how to handle BrainKB Assistant API requests

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// BrainKB Knowledge Base Data (simplified)
const brainKBData = {
  evidence: {
    "research_study": "Scientific research studies and experimental data",
    "clinical_trial": "Clinical trial results and medical evidence",
    "meta_analysis": "Systematic reviews and meta-analyses",
    "case_study": "Individual case studies and observations"
  },
  genome: {
    "gene_annotation": "Gene annotations and genomic sequences",
    "protein_expression": "Protein expression data and analysis",
    "genetic_variants": "Genetic variants and mutations",
    "regulatory_elements": "Gene regulatory elements and promoters"
  },
  anatomy: {
    "brain_regions": "Brain regions and cortical areas",
    "neural_pathways": "Neural pathways and connections",
    "cell_types": "Neuronal and glial cell types",
    "subcortical_structures": "Subcortical brain structures"
  },
  libraries: {
    "genomic_libraries": "Genomic data libraries and collections",
    "sample_collections": "Biological sample collections",
    "multimodal_data": "Multimodal genomic and anatomical data",
    "research_datasets": "Research datasets and repositories"
  }
};

// AI/ML processing function (simplified)
async function processBrainKBQuery(message, context) {
  const query = message.toLowerCase();
  let response = '';
  let confidence = 0.8;
  let sources = ['BrainKB Knowledge Base'];
  let relatedTopics = [];

  // Evidence & Assertions
  if (query.includes('evidence') || query.includes('assertion') || query.includes('research')) {
    response = "I can help you explore BrainKB's Evidence Assertion Ontology! This data model represents types and relationships of evidence and assertions in neuroscience research. You can find information about research evidence, experimental data, and scientific assertions. What specific evidence or assertion type are you looking for?";
    relatedTopics = ['research_study', 'clinical_trial', 'meta_analysis', 'case_study'];
    confidence = 0.9;
  }
  // Genome & Annotation
  else if (query.includes('genome') || query.includes('annotation') || query.includes('dna') || query.includes('gene')) {
    response = "I can help you explore BrainKB's Genome Annotation Schema! This data model represents types and relationships of an organism's annotated genome. You can find information about genetic annotations, genomic data, and DNA sequences. What genome-related information interests you?";
    relatedTopics = ['gene_annotation', 'protein_expression', 'genetic_variants', 'regulatory_elements'];
    confidence = 0.9;
  }
  // Anatomical Structures
  else if (query.includes('anatomical') || query.includes('structure') || query.includes('brain') || query.includes('neural')) {
    response = "I can help you explore BrainKB's Anatomical Structure Schema! This data model represents types and relationships of anatomical brain structures. You can find detailed information about brain regions, neural pathways, and anatomical connections. What brain structure are you researching?";
    relatedTopics = ['brain_regions', 'neural_pathways', 'cell_types', 'subcortical_structures'];
    confidence = 0.9;
  }
  // Libraries & Samples
  else if (query.includes('library') || query.includes('sample') || query.includes('multimodal') || query.includes('data')) {
    response = "I can help you explore BrainKB's Library Generation Schema! This schema represents types and relationships of samples and digital data assets generated during processes that create multimodal genomic data. You can find information about data libraries, samples, and genomic assets. What library or sample data are you looking for?";
    relatedTopics = ['genomic_libraries', 'sample_collections', 'multimodal_data', 'research_datasets'];
    confidence = 0.9;
  }
  // Tools & Playground
  else if (query.includes('playground') || query.includes('tools') || query.includes('libraries') || query.includes('interactive')) {
    response = "I can help you explore BrainKB's Playground and Tools & Libraries! These sections provide interactive tools and libraries for working with neuroscience data. You can experiment with data models, explore tools, and access various libraries. What tool or library would you like to explore?";
    relatedTopics = ['playground', 'tools', 'libraries', 'interactive'];
    confidence = 0.8;
  }
  // SEE Explorer
  else if (query.includes('see') || query.includes('visualize') || query.includes('explore') || query.includes('scientific')) {
    response = "I can help you explore BrainKB's SEE (Scientific Evidence Explorer)! This tool helps you visualize and explore scientific evidence in the knowledge base. You can search for evidence, visualize relationships, and explore research findings. What would you like to explore in SEE?";
    relatedTopics = ['see', 'visualization', 'exploration', 'scientific_evidence'];
    confidence = 0.8;
  }
  // Data Releases
  else if (query.includes('data') || query.includes('release') || query.includes('dataset') || query.includes('download')) {
    response = "I can help you explore BrainKB's Data Release section! This contains various datasets and data releases from neuroscience research. You can find genomic data, anatomical data, evidence data, and multimodal datasets. What type of data are you looking for?";
    relatedTopics = ['data_releases', 'datasets', 'downloads', 'research_data'];
    confidence = 0.8;
  }
  // Documentation & Help
  else if (query.includes('documentation') || query.includes('help') || query.includes('guide') || query.includes('how')) {
    response = "I can help you find BrainKB documentation and guides! The documentation section contains detailed information about data models, schemas, tools, and how to use the platform. What documentation topic would you like to explore?";
    relatedTopics = ['documentation', 'help', 'guides', 'tutorials'];
    confidence = 0.8;
  }
  // Contact & About
  else if (query.includes('contact') || query.includes('support') || query.includes('about') || query.includes('team')) {
    response = "I can help you find information about BrainKB! You can explore the About section for platform information, contact details, and support resources. The platform is developed by Senseable Intelligence Group. What information are you looking for?";
    relatedTopics = ['about', 'contact', 'support', 'team'];
    confidence = 0.7;
  }
  // Default response
  else {
    response = "Welcome to BrainKB! I can help you explore the neuroscience knowledge base. You can ask about Evidence Assertion Ontology, Genome Annotation Schema, Anatomical Structure Schema, Library Generation Schema, Playground tools, SEE visualization, data releases, or documentation. What would you like to explore?";
    relatedTopics = ['evidence', 'genome', 'anatomy', 'libraries'];
    confidence = 0.6;
  }

  return {
    content: response,
    metadata: {
      confidence,
      sources,
      relatedTopics
    }
  };
}

// BrainKB Assistant API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Validate request
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Process the message with BrainKB knowledge
    const response = await processBrainKBQuery(message, context);
    
    // Log the interaction (for analytics)
    console.log('BrainKB Chat Request:', {
      message,
      context,
      response: response.content,
      timestamp: new Date().toISOString()
    });

    // Return the response
    res.json(response);
    
  } catch (error) {
    console.error('BrainKB API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'BrainKB Assistant API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get available topics endpoint
app.get('/api/topics', (req, res) => {
  res.json({
    topics: brainKBData,
    description: 'Available BrainKB knowledge topics'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`BrainKB Assistant API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});

// Export for testing
module.exports = {
  app,
  processBrainKBQuery,
  brainKBData
}; 