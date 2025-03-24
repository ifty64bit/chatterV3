import { relations } from "drizzle-orm";
import {
    integer,
    pgTable,
    varchar,
    timestamp,
    text,
    boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 150 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull().unique(),
    profile_photo: text(),
    cover_photo: text(),
    bio: text(),
    password: varchar({ length: 255 }).notNull(),
    created_at: timestamp().notNull().default(new Date()),
    updated_at: timestamp().notNull().default(new Date()),
});

// export const userRelationships = relations(usersTable, ({  many }) => ({
//     rooms: many(roomsTable),
//     messages: many(messageTable),
//     roomMembers: many(roomMembersTable),
// }));

export const roomsTable = pgTable("rooms", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }),
    is_group: boolean().notNull().default(false),
    created_at: timestamp().notNull().default(new Date()),
    updated_at: timestamp().notNull().default(new Date()),
});

// export const roomRelationships = relations(roomsTable, ({ many }) => ({
//     messages: many(messageTable),
//     roomMembers: many(roomMembersTable),
// }));

export const roomMembersTable = pgTable("room_members", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    room_id: integer()
        .notNull()
        .references(() => roomsTable.id, { onDelete: "cascade" }),
    user_id: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    created_at: timestamp().notNull().default(new Date()),
    updated_at: timestamp().notNull().default(new Date()),
});

export const messageTable = pgTable("messages", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sender_id: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    room_id: integer()
        .notNull()
        .references(() => roomsTable.id, {
            onDelete: "cascade",
        }),
    content: text().notNull(),
    attachment_type: text({ enum: ["image", "video", "audio", "file"] }),
    attachment: text(),
    is_deleted: boolean().notNull().default(false),
    is_unsent: boolean().notNull().default(false),
    is_read: boolean().notNull().default(false),
    created_at: timestamp().notNull().default(new Date()),
    updated_at: timestamp().notNull().default(new Date()),
});

// export const messageRelationships = relations(messageTable, ({ one }) => ({
//     sender: one(usersTable),
//     room: one(roomsTable),
// }));
