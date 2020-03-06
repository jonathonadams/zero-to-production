# Common UI Layouts

A Library that contains common UI layouts.

## Two Column

A two column layout. Targe the left column the attribute twoColumnLeft & twoColumnRight

Response to CSS Media queries and will stack them vertically on small screens.

## Masonry

How to use. Set items, trackBy and columns

```html
<layout-masonry [items]="todos" [trackBy]="trackTodos" [columns]="columns">
  <ng-template #template let-todo>
    <!--  Add your template markup -->
    <div>{{todo.name }}</div>
    <!-- ... -->
  </ng-template>
</layout-masonry>
```
