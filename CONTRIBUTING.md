# Contributing to BrainKB Assistant

Thank you for your interest in contributing to BrainKB Assistant! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub first, then clone your fork
   git clone https://github.com/YOUR_USERNAME/brainkb-assistant.git
   cd brainkb-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development mode**
   ```bash
   npm run dev
   ```

4. **Build for testing**
   ```bash
   npm run build
   ```

## 🔧 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write your code following the existing patterns
- Add tests if applicable
- Update documentation as needed

### 3. Test Your Changes

```bash
# Build the package
npm run build

# Run tests (if available)
npm test

# Lint code
npm run lint
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Keep components focused and reusable

### CSS/Styling

- Use Tailwind CSS classes
- Follow the existing design patterns
- Keep styles responsive and accessible

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names

## 📚 Documentation

### Updating Documentation

- Update README.md for major changes
- Add examples for new features
- Keep installation guides current

### Code Comments

- Add JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up to date with code changes

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try the latest version
3. Reproduce the issue

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Node.js version: [e.g., 16.14.0]
- Browser: [e.g., Chrome 91]

**Additional Information**
Any other relevant details
```

## 💡 Feature Requests

### Before Requesting

1. Check existing issues
2. Consider if it fits the project scope
3. Think about implementation complexity

### Feature Request Template

```markdown
**Feature Description**
Brief description of the feature

**Use Case**
Why this feature is needed

**Proposed Implementation**
How you think it should work

**Alternatives Considered**
Other approaches you've considered
```

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm run build
   npm test
   ```

2. **Update documentation**
   - Update README if needed
   - Add examples for new features
   - Update installation guides

3. **Check code style**
   ```bash
   npm run lint
   ```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🏷️ Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## 📄 License

By contributing to BrainKB Assistant, you agree that your contributions will be licensed under the MIT License.

## 🆘 Getting Help

- **Issues**: [GitHub Issues](https://github.com/brainkb/brainkb-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/brainkb/brainkb-assistant/discussions)
- **Documentation**: [README.md](./README.md)

## 🙏 Thank You

Thank you for contributing to BrainKB Assistant! Your contributions help make this project better for everyone. 