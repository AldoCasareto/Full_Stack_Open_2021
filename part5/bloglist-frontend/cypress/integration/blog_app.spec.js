describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'carlos',
      username: 'Aldito21',
      password: 'pipi',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    const user2 = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Aldito21');
      cy.get('#password').type('pipi');
      cy.get('#login').click();
      cy.contains('carlos logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login').click();
      cy.get('html').should('contain', 'wrong credentials');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Aldito21', password: 'pipi' });
      cy.createBlog({
        title: 'test title2',
        url: 'test url2',
        author: 'test author2',
        likes: 0,
        user: 'Aldito21',
      });

      it('A blog can be created', function () {
        cy.createBlog({
          title: 'test title',
          url: 'test url',
          author: 'test author',
          likes: 0,
          user: 'Aldito21',
        });
        cy.createBlog({
          title: 'test title2',
          url: 'test url2',
          author: 'test author2',
          likes: 0,
          user: 'Aldito21',
        });
      });
    });

    it('A blog can be liked', function () {
      cy.contains('view').click();
      cy.get('#like').click();
      cy.contains('1 likes');
    });
    it('A blog can be deleted', function () {
      cy.contains('view').click();
      cy.get('#delete').click();
      cy.get('html').should('contain', 'blog test title2 deleted');
    });
    it('a blog cannot be deleted by someone else', function () {
      cy.get('#logout').click();
      cy.login({ username: 'root', password: 'salainen' });
      cy.contains('view').click();
      cy.get('html').should('not.contain', 'delete');
    });
  });

  describe('check sorting', function () {
    beforeEach(function () {
      cy.login({ username: 'Aldito21', password: 'pipi' });

      cy.createBlog({
        title: 'test title2 5',
        author: 'test author2',
        url: 'test url2',
        likes: 5,
      });
      cy.createBlog({
        title: 'test title 10',
        author: 'test author',
        url: 'test url',
        likes: 10,
      });
    });

    it('blogs are sorted by likes', function () {
      cy.get('#renderedHeader').then(function (blogs) {
        expect(blogs[0].textContent).to.contain('test title 10');
      });
    });
  });
});
