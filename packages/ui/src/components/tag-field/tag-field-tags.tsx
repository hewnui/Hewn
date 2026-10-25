"use client";

import type { ReactNode } from "react";
import {
  Button,
  ComboBoxValue,
  Tag,
  TagGroup,
  TagList,
  type Key,
} from "react-aria-components";
import {
  tagFieldEmptyClass,
  tagFieldRemoveClass,
  tagFieldTagClass,
  tagFieldTagListClass,
} from "./tag-field.styles";
import { TagFieldRemoveIcon } from "./tag-field-icons";

type SelectedTagsProps = {
  emptyLabel?: ReactNode;
  tagsLabel: string;
};

export function TagFieldSelectedTags({
  emptyLabel,
  tagsLabel,
}: SelectedTagsProps) {
  return (
    <ComboBoxValue>
      {({ state }) => {
        const nodes = state.selectedItems;
        const value = Array.isArray(state.value) ? state.value : [];

        return (
          <TagGroup
            aria-label={tagsLabel}
            onRemove={(keys) => {
              state.setValue(value.filter((key: Key) => !keys.has(key)));
            }}
          >
            <TagList
              className={tagFieldTagListClass}
              items={nodes.map((node) => ({
                id: node.key,
                name: node.textValue,
              }))}
              renderEmptyState={
                emptyLabel !== undefined
                  ? () => (
                      <span className={tagFieldEmptyClass}>{emptyLabel}</span>
                    )
                  : () => null
              }
            >
              {(item) => (
                <Tag
                  id={item.id}
                  textValue={item.name}
                  className={tagFieldTagClass()}
                >
                  <span className="truncate">{item.name}</span>
                  <Button slot="remove" className={tagFieldRemoveClass()}>
                    <TagFieldRemoveIcon />
                  </Button>
                </Tag>
              )}
            </TagList>
          </TagGroup>
        );
      }}
    </ComboBoxValue>
  );
}
