import { DataTypes, literal, ModelAttributes, QueryInterface, Sequelize } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Movie', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // which showroom will display which movie at which time
    await queryInterface.createTable('ShowRoom', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('SeatType', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      seat_type:{ 
        type: DataTypes.ENUM,
        values: ['VIP', 'Couple', 'Super', 'Normal']
      },
      premium_percentage: {
        type: "integer"
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // which showroom have which seats
    await queryInterface.createTable('ShowRoomSeat', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      seat_number: { type: 'varchar' },
      seat_type_id:{ 
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      show_room_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // we can see which movies will be display in which rooms on which time
    await queryInterface.createTable('ShowsDisplay', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      time: { type: 'timestamp' },
      show_room_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room'
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      movie_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'movie_id',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    // we can book a seat of specific type
    // we can display his showroom and seating on his ticket
    // we can see which show is booked out, like how many seats of any rooms are available against which show
    await queryInterface.createTable('Booking', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      payment_method: {type: 'varchar'},
      paid: {type: 'boolean'},
      show_display_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_display',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      show_room_seat_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room_seat',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);


  },

  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
