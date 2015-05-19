skel.init({
  breakpoints: {
    large: {
      media: '(min-width: 1025px) and (max-width: 1280px)',
      href: 'styles/style-large.css'
    },
    medium: {
      media: '(min-width: 769px) and (max-width: 1024px)',
      href: 'styles/style-medium.css'
    },
    small: {
      media: '(max-width: 768px)',
      href: 'styles/style-small.css'
    }
  }
});