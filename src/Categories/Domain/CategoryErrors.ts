export class CategoryNameDuplicatedError extends Error {
  constructor() {
    super("Category name already exists");
  }
}

export class CategoryNameRequiredError extends Error {
  constructor() {
    super("Category name is required");
  }
}

export class CategoryNotFoundError extends Error {
  constructor() {
    super("Category not found");
  }
}

export class CategoryUuidDuplicatedError extends Error {
  constructor() {
    super("Category uuid already exists");
  }
}

export class ParentCategoryNotFoundError extends Error {
  constructor() {
    super("Parent category not found");
  }
}
