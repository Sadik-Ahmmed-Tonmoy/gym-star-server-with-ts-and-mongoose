import { model, Schema } from 'mongoose';
import { ClassModel, TClass } from './class.interface';

const classSchema = new Schema<TClass, ClassModel>(
  {
    className: {
      type: String,
      required: [true, 'Class Name is required'],
      trim: true,
      maxlength: [20, 'Class Name can not be more than 20 characters'],
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    startTime: {
      type: String, // Can also use Date object depending on your implementation
      required: true,
    },
    endTime: {
      type: String, // Calculated based on startTime, default: 2 hours after startTime
      required: false,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      default: '2hrs',
    },
    maxTrainees: {
      type: Number,
      required: false,
    },
    enrolledTrainees: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      validate: {
        validator: function (val) {
          return val.length <= 10; // Max 10 trainees per class
        },
        message: 'Class cannot have more than 10 trainees.',
      },
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Query Middleware

// Pre-save hook to validate maximum 5 classes per day
classSchema.pre('save', async function (next) {
  // const Class = this.constructor as typeof ClassModel;
  const classCount = await Class.countDocuments({ date: this.date });
    if (classCount >= 5) {
      throw new Error('Cannot schedule more than 5 classes per day.');
    }
    next();
  });
  
classSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

classSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

classSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});



// static methods
classSchema.statics.isClassExists = async function (id: string) {
  return this.findById(id);
};
classSchema.statics.isTrainerAvailable = async function (trainerId: string) {
  return this.exists({ trainer: trainerId, role: 'trainer' });
};
classSchema.statics.isTraineeEnrolled = async function (
  classId: string,
  traineeId: string,
) {
  return this.exists({ _id: classId, enrolledTrainees: traineeId });
};
classSchema.statics.isTraineeEnrolledInAnyClass = async function (
  traineeId: string,
) {
  return this.exists({ enrolledTrainees: traineeId });
};
classSchema.statics.isTraineeEnrolledInClass = async function (
  traineeId: string,
  classId: string,
) {
  return this.exists({ _id: classId, enrolledTrainees: traineeId });
};
classSchema.statics.isClassFull = async function (classId: string) {
  return this.findOne({
    _id: classId,
    enrolledTrainees: { $size: '$maxTrainees' },
  });
};
classSchema.statics.isClassStarted = async function (classId: string) {
  return this.findOne({ _id: classId, date: { $lt: new Date() } });
};
classSchema.statics.isClassEnded = async function (classId: string) {
  return this.findOne({ _id: classId, date: { $gt: new Date() } });
};
classSchema.statics.isClassDeleted = async function (classId: string) {
  return this.findOne({ _id: classId, isDeleted: true });
};
classSchema.statics.isTrainerExists = async function (trainerId: string) {
  return this.exists({ trainer: trainerId });
};
classSchema.statics.isTrainerDeleted = async function (trainerId: string) {
  return this.findOne({ trainer: trainerId, isDeleted: true });
};
classSchema.statics.isTraineeExists = async function (traineeId: string) {
  return this.exists({ enrolledTrainees: traineeId });
};
classSchema.statics.isTraineeDeleted = async function (traineeId: string) {
  return this.findOne({ enrolledTrainees: traineeId, isDeleted: true });
};
classSchema.statics.isTraineeEnrolledInClass = async function (
  traineeId: string,
  classId: string,
) {
  return this.exists({ _id: classId, enrolledTrainees: traineeId });
};
classSchema.statics.isTraineeEnrolledInAnyClass = async function (
  traineeId: string,
) {
  return this.exists({ enrolledTrainees: traineeId });
};
classSchema.statics.enrollTrainee = async function (
  classId: string,
  traineeId: string,
) {
  return this.findByIdAndUpdate(classId, {
    $push: { enrolledTrainees: traineeId },
  });
};
classSchema.statics.removeTrainee = async function (
  classId: string,
  traineeId: string,
) {
  return this.findByIdAndUpdate(classId, {
    $pull: { enrolledTrainees: traineeId },
  });
};
classSchema.statics.getClassesByTrainerId = async function (trainerId: string) {
  return this.find({ trainer: trainerId });
};

export const Class = model<TClass, ClassModel>('Class', classSchema);
