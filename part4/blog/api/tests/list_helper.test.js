import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from '../utils/list_helper';

const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

export const variousBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];
  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('number of likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });
  test('when list has only one blog the likes of that', () => {
    const result = totalLikes(oneBlog);
    expect(result).toBe(5);
  });
  test('of a bigger list calculated right', () => {
    const result = totalLikes(variousBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when 0 blogs', () => {
    const blogs = [];
    const result = favoriteBlog(blogs);
    expect(result).toEqual(0);
  });

  test('when the list has 1 blog', () => {
    const result = favoriteBlog(oneBlog);
    expect(result).toEqual(oneBlog[0]);
  });

  test('blogs with the most votes', () => {
    const result = favoriteBlog(variousBlogs);
    expect(result).toEqual(variousBlogs[2]);
  });
});

describe('author with the most blogs', () => {
  test('of empty list is zero', () => {
    const blogs = [];
    const result = mostBlogs(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog', () => {
    const result = mostBlogs(oneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('when the list has many blogs', () => {
    const result = mostBlogs(variousBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('author with the most likes', () => {
  test('of empty list is 0', () => {
    const blogs = [];
    const result = mostLikes(blogs);
    expect(result).toBe(0);
  });
  test('when the list has one blog', () => {
    const result = mostLikes(oneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('when there is more than 1 blog', () => {
    const result = mostLikes(variousBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});